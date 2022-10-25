import { Product } from './types/product'
import { ProductDetail } from './types/product-detail'

export type UseProductService = {
    get(page: number): Promise<Product[]>
    getByTerm(term: string, page: number): Promise<Product[]>
    getDetail(id: string): Promise<ProductDetail>
}
