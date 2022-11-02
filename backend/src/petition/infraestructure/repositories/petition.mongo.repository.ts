import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { PetitionRepository } from 'src/petition/application/repositories/petition.repository'
import { CriteriaValues } from 'src/petition/application/types/criteria.values'
import { PaginationDTO } from 'src/petition/application/types/pagination.dto'
import { Petition } from 'src/petition/domain/petition'
import { FranchiseRef } from 'src/petition/domain/value-objects/franchise.ref'
import { PetitionDate } from 'src/petition/domain/value-objects/petition.date'
import { PetitionId } from 'src/petition/domain/value-objects/petition.id'
import { UserRef } from 'src/petition/domain/value-objects/user.ref'
import { petitionDbToDomain } from '../mappers/petition.db.domain'
import { PetitionDocument } from '../models/petition.model'
import { Petition as PetitionDb } from '../models/petition.model'

@Injectable()
export class PetitionMongoRepository implements PetitionRepository {
    constructor(
        @InjectModel(PetitionDb.name)
        private petitionModel: Model<PetitionDocument>,
    ) {}

    async save(aggregate: Petition): Promise<Petition> {
        const petition = await this.petitionModel.findById(aggregate.id.value)
        if (!petition) {
            const petitionToSave = new this.petitionModel()
            petitionToSave._id = aggregate.id.value
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
        await this.petitionModel.findByIdAndDelete(aggregate.id.value)
        return aggregate
    }

    async searchById(id: PetitionId): Promise<Petition> {
        const petition = await this.petitionModel.findById(id.value)
        return petition ? petitionDbToDomain(petition) : null
    }

    async list(): Promise<Petition[]> {
        const petitions = await this.petitionModel.find()
        return petitions.map(petitionDbToDomain)
    }

    async filter(
        initialDate: PetitionDate,
        endDate: PetitionDate,
    ): Promise<Petition[]> {
        const petitions = await this.petitionModel.find({
            date: {
                $gte: initialDate.value,
                $lt: endDate.value,
            },
        })
        return petitions.map(petitionDbToDomain)
    }

    async filterByClient(
        client: UserRef,
        page?: PaginationDTO,
    ): Promise<Petition[]> {
        const petitions = await this.petitionModel
            .find({
                client: client.value.value,
            })
            .sort({ date: -1 })
            .skip((page.page - 1) * 10)
            .limit(10)
        return petitions.map(petitionDbToDomain)
    }

    async filterByFranchise(
        franchise: FranchiseRef,
        page?: PaginationDTO,
    ): Promise<Petition[]> {
        const petitions = await this.petitionModel
            .find({
                franchise: franchise.value.value,
            })
            .sort({ date: -1 })
            .skip((page.page - 1) * 10)
            .limit(10)
        return petitions.map(petitionDbToDomain)
    }

    async filterByClientCriteria(
        client: UserRef,
        criterias: CriteriaValues,
        page?: PaginationDTO,
    ): Promise<Petition[]> {
        const petitions = await this.petitionModel
            .find({
                client: client.value.value,
                productName: new RegExp(criterias.term),
            })
            .sort({ date: -1 })
            .skip((page.page - 1) * 10)
            .limit(10)
        return petitions.map(petitionDbToDomain)
    }

    async filterByFranchiseCriteria(
        franchise: FranchiseRef,
        criterias: CriteriaValues,
        page?: PaginationDTO,
    ): Promise<Petition[]> {
        const petitions = await this.petitionModel
            .find({
                franchise: franchise.value.value,
                productName: new RegExp(criterias.term),
            })
            .sort({ date: -1 })
            .skip((page.page - 1) * 10)
            .limit(10)
        return petitions.map(petitionDbToDomain)
    }
}
