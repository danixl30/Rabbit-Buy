import { Product } from './product'

export type ProductDetail = Product & {
    description: string
    existence: number
    categories: string[]
    franchise: {
        name: string
        id: string
    }
}
