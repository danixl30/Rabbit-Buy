import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ProviderRepository } from 'src/provider/application/repositories/provider.repository'
import { Provider } from 'src/provider/domain/provider'
import { FranchiseRef } from 'src/provider/domain/value-objects/franchise.ref'
import { ProviderId } from 'src/provider/domain/value-objects/provider.id'
import { providerDbToDomain } from '../mappers/provider.db.domain'
import {
    Provider as ProviderDb,
    ProviderDocument,
} from '../models/provider.model'

export class ProviderMongoRepository implements ProviderRepository {
    constructor(
        @InjectModel(ProviderDb.name)
        private providerModel: Model<ProviderDocument>,
    ) {}
    async save(aggregate: Provider): Promise<Provider> {
        const provider = await this.providerModel.findById(aggregate.id.value)
        if (!provider) {
            const providerToSave = new this.providerModel()
            providerToSave._id = aggregate.id.value
            providerToSave.franchise = aggregate.franchise.value.value
            await providerToSave.save()
        }
        provider.franchise = aggregate.franchise.value.value
        await provider.save()
        return aggregate
    }

    async delete(aggregate: Provider): Promise<Provider> {
        await this.providerModel.findByIdAndDelete(aggregate.id.value)
        return aggregate
    }

    async searchById(id: ProviderId): Promise<Provider> {
        const provider = await this.providerModel.findById(id.value)
        if (!provider) return null
        return providerDbToDomain(provider)
    }

    async findByFranchise(franchise: FranchiseRef): Promise<Provider[]> {
        const providers = await this.providerModel.find({
            franchise: franchise.value.value,
        })
        return providers.map(providerDbToDomain)
    }
}
