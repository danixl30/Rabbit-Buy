import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { from as mongooseUUID } from 'uuid-mongodb'
import { PetitionRepository } from 'src/petition/application/repositories/petition.repository'
import { Petition } from 'src/petition/domain/petition'
import { PetitionId } from 'src/petition/domain/value-objects/petition.id'
import { petitionDbToDomain } from '../mappers/petition.db.domain'
import { PetitionDocument } from '../models/petition.model'
import { Petition as PetitionDb } from '../models/petition.model'
import { Criteria } from 'src/core/application/repository/query/criteria'
import { CriteriaMongoTransformer } from 'src/core/infraestructure/criteria-transformer/mongo/crietia.mongo.transformer'

@Injectable()
export class PetitionMongoRepository implements PetitionRepository {
    constructor(
        @InjectModel(PetitionDb.name)
        private petitionModel: Model<PetitionDocument>,
        private criteriaTransformer: CriteriaMongoTransformer,
    ) {}

    async save(aggregate: Petition): Promise<Petition> {
        const petition = await this.petitionModel.findById(
            mongooseUUID(aggregate.id.value),
        )
        if (!petition) {
            const petitionToSave = new this.petitionModel()
            petitionToSave.id = aggregate.id.value
            petitionToSave.productName = aggregate.productName.value
            petitionToSave.productId = aggregate.product.value.value
            petitionToSave.productPrice = aggregate.price.value
            petitionToSave.productCurrency = aggregate.currency.value
            petitionToSave.quantiny = aggregate.quantity.value
            petitionToSave.client = aggregate.client.value.value
            petitionToSave.franchise = aggregate.franchise.value.value
            petitionToSave.status = aggregate.status.value
            petitionToSave.date = aggregate.date.value
            await petitionToSave.save()
            return aggregate
        }
        petition.productName = aggregate.productName.value
        petition.productPrice = aggregate.price.value
        petition.productCurrency = aggregate.currency.value
        petition.quantiny = aggregate.quantity.value
        petition.client = aggregate.client.value.value
        petition.franchise = aggregate.franchise.value.value
        petition.status = aggregate.status.value
        petition.date = aggregate.date.value
        await petition.save()
        return aggregate
    }

    async delete(aggregate: Petition): Promise<Petition> {
        await this.petitionModel.findByIdAndDelete(
            mongooseUUID(aggregate.id.value),
        )
        return aggregate
    }

    async searchById(id: PetitionId): Promise<Petition> {
        const petition = await this.petitionModel.findById(
            mongooseUUID(id.value),
        )
        return petition ? petitionDbToDomain(petition) : null
    }

    async searchAll(criteria: Criteria): Promise<Petition[]> {
        const criteriaMongo = this.criteriaTransformer.transform(criteria)
        const petitions = await this.petitionModel
            .find(criteriaMongo.filter)
            .sort(criteriaMongo.sort)
            .skip(criteriaMongo.skip)
            .limit(criteriaMongo.limit)
        return petitions.map(petitionDbToDomain)
    }

    async searchOne(criteria: Criteria): Promise<Petition> {
        const criteriaMongo = this.criteriaTransformer.transform(criteria)
        const petition = await this.petitionModel.findOne(criteriaMongo.filter)
        return petition ? petitionDbToDomain(petition) : null
    }
}
