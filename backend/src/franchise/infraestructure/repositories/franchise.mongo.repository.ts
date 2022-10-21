import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { FranchiseRepository } from 'src/franchise/application/repositories/franchise.repository'
import { Franchise } from 'src/franchise/domain/franchise'
import { FranchiseGroupId } from 'src/franchise/domain/value-objects/franchise.group.id'
import { FranchiseId } from 'src/franchise/domain/value-objects/franchise.id'
import { franchiseDbToDomain } from '../mappers/franchise.db.domain'
import {
    Franchise as FranchiseDb,
    FranchiseDocument,
} from '../models/franchise.model'

@Injectable()
export class FranchiseMongoRepository implements FranchiseRepository {
    constructor(
        @InjectModel(FranchiseDb.name)
        private franchiseModel: Model<FranchiseDocument>,
    ) {}
    async save(aggregate: Franchise): Promise<Franchise> {
        const franchise = await this.franchiseModel.findById(aggregate.id.value)
        if (!franchise) {
            const franchiseToSave = new this.franchiseModel()
            franchiseToSave._id = aggregate.id.value
            franchiseToSave.name = aggregate.name.value
            franchiseToSave.rif = aggregate.rif.value
            franchiseToSave.groupId = aggregate.groupId.value
            await franchiseToSave.save()
            return aggregate
        }
        franchise.name = aggregate.name.value
        franchise.rif = aggregate.rif.value
        franchise.groupId = aggregate.groupId.value
        await franchise.save()
        return aggregate
    }

    async delete(aggregate: Franchise): Promise<Franchise> {
        await this.franchiseModel.findByIdAndDelete(aggregate.id.value)
        return aggregate
    }

    async searchById(id: FranchiseId): Promise<Franchise> {
        const franchise = await this.franchiseModel.findById(id.value)
        return franchise ? franchiseDbToDomain(franchise) : null
    }

    async searchByGroudId(groupId: FranchiseGroupId): Promise<Franchise> {
        const franchise = await this.franchiseModel.findOne({
            groupId: groupId.value,
        })
        return franchise ? franchiseDbToDomain(franchise) : null
    }

    async list(): Promise<Franchise[]> {
        const franchises = await this.franchiseModel.find()
        return franchises.map(franchiseDbToDomain)
    }
}
