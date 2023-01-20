import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { ApplicationService } from 'src/core/application/service/application.service'
import { PetitionRepository } from 'src/petition/application/repositories/petition.repository'
import { PetitionId } from 'src/petition/domain/value-objects/petition.id'
import { Status } from 'src/petition/domain/value-objects/status'
import { ProductExistence } from 'src/product/domain/value-objects/product.existence'
import { ProductId } from 'src/product/domain/value-objects/product.id'
import { ProductNotFoundException } from '../../exceptions/product.not.found'
import { ProductRepository } from '../../repositories/product.repository'
import { BuyProductDTO } from './types/buy.product.dto'
import { BuyProductResponse } from './types/buy.product.response'

export class BuyProductApplicationService
    implements ApplicationService<BuyProductDTO, BuyProductResponse>
{
    constructor(
        private productRepository: ProductRepository,
        private petitionRepository: PetitionRepository,
        private eventHandler: EventHandler,
    ) {}

    async execute(data: BuyProductDTO): Promise<BuyProductResponse> {
        const petition = await this.petitionRepository.searchById(
            PetitionId.create(data.petition),
        )
        if (!petition || !petition.status.equals(Status.createOpened()))
            throw new Error('Not able to buy')
        const product = await this.productRepository.searchById(
            ProductId.create(data.id),
        )
        if (!product) throw new ProductNotFoundException()
        product.buy(ProductExistence.create(data.quantity))
        await this.productRepository.save(product)
        this.eventHandler.publish(product.pullEvents())
        return {
            id: product.id.value,
        }
    }
}
