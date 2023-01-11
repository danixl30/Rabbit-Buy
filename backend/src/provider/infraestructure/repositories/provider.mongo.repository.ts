import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { from as mongooseUUID } from 'uuid-mongodb'
import { ProviderRepository } from 'src/provider/application/repositories/provider.repository'
import { Provider } from 'src/provider/domain/provider'
import { FranchiseRef } from 'src/provider/domain/value-objects/franchise.ref'
import { ProviderId } from 'src/provider/domain/value-objects/provider.id'
import { providerDbToDomain } from '../mappers/provider.db.domain'
import {
    Provider as ProviderDb,
    ProviderDocument,
} from '../models/provider.model'
import { CriteriaMongoTransformer } from 'src/core/infraestructure/criteria-transformer/mongo/crietia.mongo.transformer'
import { Criteria } from 'src/core/application/repository/query/criteria'

@Injectable()
export class ProviderMongoRepository implements ProviderRepository {
    constructor(
        @InjectModel(ProviderDb.name)
        private providerModel: Model<ProviderDocument>,
        private criteriaTransformer: CriteriaMongoTransformer,
    ) {}
    async save(aggregate: Provider): Promise<Provider> {
        const provider = await this.providerModel.findById(aggregate.id.value)
        if (!provider) {
            const providerToSave = new this.providerModel()
            providerToSave.id = aggregate.id.value
            providerToSave.franchise = aggregate.franchise.value.value
            await providerToSave.save()
            return aggregate
        }
        provider.franchise = aggregate.franchise.value.value
        await provider.save()
        return aggregate
    }

    async delete(aggregate: Provider): Promise<Provider> {
        await this.providerModel.findByIdAndDelete(
            mongooseUUID(aggregate.id.value),
        )
        return aggregate
    }

    async searchById(id: ProviderId): Promise<Provider> {
        const provider = await this.providerModel.findById(
            mongooseUUID(id.value),
        )
        return provider ? providerDbToDomain(provider) : null
    }

    async findByFranchise(franchise: FranchiseRef): Promise<Provider[]> {
        const providers = await this.providerModel.find({
            franchise: franchise.value.value,
        })
        return providers.map(providerDbToDomain)
    }

    async searchAll(criteria: Criteria): Promise<Provider[]> {
        const criteriaMongo = this.criteriaTransformer.transform(criteria)
        const providers = await this.providerModel
            .find(criteriaMongo.filter)
            .sort(criteriaMongo.sort)
            .skip(criteriaMongo.skip)
            .limit(criteriaMongo.limit)
        return providers.map(providerDbToDomain)
    }
}
