import { ChangeProductDescription } from './types/change-description'
import { ChangeProductExistence } from './types/change-existence'
import { ChangeProductImage } from './types/change-image'
import { ChangeProductName } from './types/change-name'
import { ChangeProductPrice } from './types/change-price'
import { CreateProduct } from './types/CreateProduct'
import { GetProductsByFranchiseDTO } from './types/get-products-franchise-dto'
import { GetProductsByProviderDTO } from './types/get-products-provider-dto'
import { Product } from './types/product'
import { ProductDetail } from './types/product-detail'

export type UseProductService = {
    get(page: number): Promise<Product[]>
    getByTerm(term: string, page: number): Promise<Product[]>
    getByFranchise(dto: GetProductsByFranchiseDTO): Promise<Product[]>
    getByProvider(
        token: string,
        dto: GetProductsByProviderDTO,
    ): Promise<Product[]>
    getDetail(id: string): Promise<ProductDetail>
    create(token: string, dto: CreateProduct): Promise<boolean>
    delete(token: string, productId: string): Promise<boolean>
    changeName(token: string, dto: ChangeProductName): Promise<boolean>
    changeDescription(
        token: string,
        dto: ChangeProductDescription,
    ): Promise<boolean>
    changePrice(token: string, dto: ChangeProductPrice): Promise<boolean>
    changeExistence(
        token: string,
        dto: ChangeProductExistence,
    ): Promise<boolean>
    changeImage(token: string, dto: ChangeProductImage): Promise<boolean>
}
