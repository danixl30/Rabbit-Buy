import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { ApplicationService } from 'src/core/application/service/application.service'
import { ImageStorage } from 'src/core/application/storage/images/image.storage'
import { FranchiseId } from 'src/franchise/domain/value-objects/franchise.id'
import { FranchiseRef } from 'src/product/domain/value-objects/franchise.ref'
import { ProductRepository } from '../../repositories/product.repository'
import { FindProductsFranchiseQueryFactory } from './queries/find.product.franchise.query.factory'
import { DeleteProductsByFranchiseDTO } from './types/dto'

export class DeleteProductsByFranchiseApplicationService
    implements ApplicationService<DeleteProductsByFranchiseDTO, void>
{
    constructor(
        private productRepository: ProductRepository,
        private imageStorage: ImageStorage,
        private eventHandler: EventHandler,
    ) {}

    async execute(data: DeleteProductsByFranchiseDTO): Promise<void> {
        const products = await this.productRepository.searchAll(
            new FindProductsFranchiseQueryFactory(
                FranchiseRef.create(FranchiseId.create(data.franchise)),
            ).create(),
        )
        products.asyncForEach(async (product) =>
            this.imageStorage.delete({
                url: product.image.value,
            }),
        )
        products.forEach((product) => product.delete())
        await products.asyncForEach(async (product) => {
            await this.productRepository.delete(product)
        })
        this.eventHandler.publish(
            products.map((product) => product.pullEvents()).flat(),
        )
    }
}
