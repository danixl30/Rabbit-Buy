import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { ApplicationService } from 'src/core/application/service/application.service'
import { ImageStorage } from 'src/core/application/storage/images/image.storage'
import { ProductImage } from 'src/product/domain/value-objects/image'
import { ProductId } from 'src/product/domain/value-objects/product.id'
import { ProductNotFoundException } from '../../exceptions/product.not.found'
import { ProductRepository } from '../../repositories/product.repository'
import { ChangeProductImageDTO } from './types/dto'
import { ChangeProductImageResponse } from './types/response'

export class ChangeProductImageApplicationService
    implements
        ApplicationService<ChangeProductImageDTO, ChangeProductImageResponse>
{
    constructor(
        private productRepository: ProductRepository,
        private imageStorage: ImageStorage,
        private eventHandler: EventHandler,
    ) {}

    async execute(
        data: ChangeProductImageDTO,
    ): Promise<ChangeProductImageResponse> {
        const product = await this.productRepository.searchById(
            new ProductId(data.id),
        )
        if (!product) throw new ProductNotFoundException()
        const oldImage = product.image
        const newImage = await this.imageStorage.save({
            path: data.path,
        })
        product.changeImage(new ProductImage(newImage.url))
        await this.productRepository.save(product)
        this.eventHandler.publish(product.pullEvents())
        await this.imageStorage.delete({
            url: oldImage.value,
        })
        return {
            id: product.id.value,
        }
    }
}
