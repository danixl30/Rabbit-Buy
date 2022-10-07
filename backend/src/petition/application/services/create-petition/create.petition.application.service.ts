import { ApplicationService } from 'src/core/application/service/application.service'
import { UUIDGenerator } from 'src/core/application/UUID/UUID.generator'
import { FranchiseId } from 'src/franchise/domain/value-objects/franchise.id'
import { Petition } from 'src/petition/domain/petition'
import { FranchiseRef } from 'src/petition/domain/value-objects/franchise.ref'
import { PetitionDate } from 'src/petition/domain/value-objects/petition.date'
import { PetitionId } from 'src/petition/domain/value-objects/petition.id'
import { PetitionQuantity } from 'src/petition/domain/value-objects/petition.quantity'
import { ProductCurrency } from 'src/petition/domain/value-objects/product.currency'
import { ProductName } from 'src/petition/domain/value-objects/product.name'
import { ProductPrice } from 'src/petition/domain/value-objects/product.price'
import { Status } from 'src/petition/domain/value-objects/status'
import { Statuses } from 'src/petition/domain/value-objects/statuses'
import { UserRef } from 'src/petition/domain/value-objects/user.ref'
import { GetProductDetailApplicationService } from 'src/product/application/services/get-product-detail/product.detail.application.service'
import { UserId } from 'src/user/domain/value-objects/user.id'
import { PetitionRepository } from '../../repositories/petition.repository'
import { ExistenceInsuficentException } from './exceptions/existence.insuficent'
import { CreatePetitionDTO } from './types/create.petition.dto'
import { CreatePetitionResponse } from './types/create.petition.response'

export class CreatePetitionApplicationService
    implements ApplicationService<CreatePetitionDTO, CreatePetitionResponse>
{
    constructor(
        private petitionRepository: PetitionRepository,
        private productDetalil: GetProductDetailApplicationService,
        private uuid: UUIDGenerator,
    ) {}

    async execute(data: CreatePetitionDTO): Promise<CreatePetitionResponse> {
        const product = await this.productDetalil.execute({
            id: data.product,
        })
        if (data.quantity > product.existence)
            throw new ExistenceInsuficentException()
        const petition = new Petition(
            new PetitionId(this.uuid.generate()),
            new ProductName(product.name),
            new ProductPrice(product.price),
            new PetitionQuantity(data.quantity),
            new ProductCurrency(product.currency),
            new UserRef(new UserId(data.userId)),
            new Status(Statuses.OPEN),
            new PetitionDate(new Date()),
            new FranchiseRef(new FranchiseId(product.franchise.id)),
        )
        await this.petitionRepository.save(petition)
        return {
            id: petition.id.value,
        }
    }
}
