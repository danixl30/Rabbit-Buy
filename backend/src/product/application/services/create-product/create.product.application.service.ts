import { CategoryId } from 'src/category/domain/value-objects/category.id'
import { ApplicationService } from 'src/core/application/service/application.service'
import { UUIDGenerator } from 'src/core/application/UUID/UUID.generator'
import { ProductCurrency } from 'src/product/domain/value-objects/product.currency'
import { ProductName } from 'src/product/domain/value-objects/product.name'
import { Product } from 'src/product/domain/product'
import { CategoryRef } from 'src/product/domain/value-objects/category.ref'
import { ProductDescription } from 'src/product/domain/value-objects/product.description'
import { ProductExistence } from 'src/product/domain/value-objects/product.existence'
import { ProductId } from 'src/product/domain/value-objects/product.id'
import { ProductPrice } from 'src/product/domain/value-objects/product.price'
import { ProductRepository } from '../../repositories/product.repository'
import { CreateProductDTO } from './types/create.product.dto'
import { CreateProductResponse } from './types/create.product.response'
import { FranchiseRef } from 'src/product/domain/value-objects/franchise.ref'
import { ProviderRepository } from 'src/provider/application/repositories/provider.repository'
import { GetProviderApplicationService } from 'src/provider/application/services/get-provider/get.provider.application.service'
import { FranchiseId } from 'src/franchise/domain/value-objects/franchise.id'
import { ImageStorage } from 'src/core/application/storage/images/image.storage'
import { ProductImage } from 'src/product/domain/value-objects/image'

export class CreateProductApplicationService
    implements ApplicationService<CreateProductDTO, CreateProductResponse>
{
    constructor(
        private productRepository: ProductRepository,
        private uuid: UUIDGenerator,
        private providerService: GetProviderApplicationService,
        private imageStorage: ImageStorage,
    ) {}

    async execute(data: CreateProductDTO): Promise<CreateProductResponse> {
        const provider = await this.providerService.execute({
            id: data.provider,
        })
        const image = await this.imageStorage.save({
            path: data.image,
        })
        const product = new Product(
            new ProductId(this.uuid.generate()),
            new ProductName(data.name),
            new ProductDescription(data.description),
            new ProductExistence(data.existence),
            new ProductPrice(data.price),
            new ProductCurrency(data.currency),
            new CategoryRef(new CategoryId(data.category)),
            new FranchiseRef(new FranchiseId(provider.franchise)),
            new ProductImage(image.url),
        )
        await this.productRepository.save(product)
        return {
            id: product.id.value,
        }
    }
}