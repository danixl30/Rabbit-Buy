import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { from as mongooseUUID } from 'uuid-mongodb'
import { FranchiseRepository } from 'src/franchise/application/repositories/franchise.repository'
import { Franchise } from 'src/franchise/domain/franchise'
import { FranchiseId } from 'src/franchise/domain/value-objects/franchise.id'
import { franchiseDbToDomain } from '../mappers/franchise.db.domain'
import {
    Franchise as FranchiseDb,
    FranchiseDocument,
} from '../models/franchise.model'
import { Criteria } from 'src/core/application/repository/query/criteria'
import { CriteriaMongoTransformer } from 'src/core/infraestructure/criteria-transformer/mongo/crietia.mongo.transformer'

@Injectable()
export class FranchiseMongoRepository implements FranchiseRepository {
    constructor(
        @InjectModel(FranchiseDb.name)
        private franchiseModel: Model<FranchiseDocument>,
        private criteriaTransformer: CriteriaMongoTransformer,
    ) {}
    async save(aggregate: Franchise): Promise<Franchise> {
        const franchise = await this.franchiseModel.findById(aggregate.id.value)
        if (!franchise) {
            const franchiseToSave = new this.franchiseModel()
            franchiseToSave.id = aggregate.id.value
            franchiseToSave.name = aggregate.name.value
            franchiseToSave.rif = aggregate.rif.value
            franchiseToSave.groupId = aggregate.groupId.value
            franchiseToSave.image = aggregate.image.value
            await franchiseToSave.save()
            return aggregate
        }
        franchise.name = aggregate.name.value
        franchise.rif = aggregate.rif.value
        franchise.groupId = aggregate.groupId.value
        franchise.image = aggregate.image.value
        await franchise.save()
        return aggregate
    }

    async delete(aggregate: Franchise): Promise<Franchise> {
        await this.franchiseModel.findByIdAndDelete(
            mongooseUUID(aggregate.id.value),
        )
        return aggregate
    }

    async searchById(id: FranchiseId): Promise<Franchise> {
        const franchise = await this.franchiseModel.findById(
            mongooseUUID(id.value),
        )
        return franchise ? franchiseDbToDomain(franchise) : null
    }
    async searchAll(criteria: Criteria): Promise<Franchise[]> {
        const criteriaMongo = this.criteriaTransformer.transform(criteria)
        const franchises = await this.franchiseModel
            .find(criteriaMongo.filter)
            .sort(criteriaMongo.sort)
            .skip(criteriaMongo.skip)
            .limit(criteriaMongo.limit)
        return franchises.map(franchiseDbToDomain)
    }

    async searchOne(criteria: Criteria): Promise<Franchise> {
        const criteriaMongo = this.criteriaTransformer.transform(criteria)
        const franchise = await this.franchiseModel.findOne(
            criteriaMongo.filter,
        )
        return franchise ? franchiseDbToDomain(franchise) : null
    }
}
