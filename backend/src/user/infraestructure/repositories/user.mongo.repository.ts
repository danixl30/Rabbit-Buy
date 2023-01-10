import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Criteria } from 'src/core/application/repository/query/criteria'
import { CriteriaMongoTransformer } from 'src/core/infraestructure/criteria-transformer/mongo/crietia.mongo.transformer'
import { UserRepository } from 'src/user/application/repositories/user.repository'
import { User } from 'src/user/domain/user'
import { Email } from 'src/user/domain/value-objects/email'
import { UserId } from 'src/user/domain/value-objects/user.id'
import {
    User as UserDb,
    UserDocument,
} from 'src/user/infraestructure/models/user.model'
import { from as mongooseUUID } from 'uuid-mongodb'
import { userDocumentToDomain } from '../mappers/user.document.domain'

@Injectable()
export class UserMongoRepository implements UserRepository {
    constructor(
        @InjectModel(UserDb.name) private userModel: Model<UserDocument>,
        private criteriaTransformer: CriteriaMongoTransformer,
    ) {}
    async save(aggregate: User): Promise<User> {
        const user = await this.userModel.findById(aggregate.id.value)
        if (!user) {
            const userToSave = new this.userModel()
            userToSave.id = aggregate.id.value
            userToSave.name = aggregate.username.value
            userToSave.password = aggregate.password.value
            userToSave.email = aggregate.email.value
            userToSave.role = aggregate.role.value
            await this.userModel.create(userToSave)
            return aggregate
        }
        user.name = aggregate.username.value
        user.password = aggregate.password.value
        user.email = aggregate.email.value
        user.role = aggregate.role.value
        await user.save()
        return aggregate
    }

    async delete(aggregate: User): Promise<User> {
        await this.userModel.findByIdAndDelete(mongooseUUID(aggregate.id.value))
        return aggregate
    }

    async getById(userId: UserId): Promise<User> {
        const user = await this.userModel.findById(mongooseUUID(userId.value))
        return user ? userDocumentToDomain(user) : null
    }

    async getByEmail(email: Email): Promise<User> {
        const user = await this.userModel.findOne({ email: email.value })
        return user ? userDocumentToDomain(user) : null
    }

    async getAll(criteria: Criteria): Promise<User[]> {
        const criteriaMongo = this.criteriaTransformer.transform(criteria)
        const users = await this.userModel
            .find(criteriaMongo.filter)
            .sort(criteriaMongo.sort)
            .skip(criteriaMongo.skip)
            .limit(criteriaMongo.limit)
        return users.map(userDocumentToDomain)
    }
}
