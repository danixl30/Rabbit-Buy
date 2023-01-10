import { UseHttp } from '../../../core/abstractions/http/http'
import { UseProductService } from '../../abstractions/product/product-service'
import { ChangeProductDescription } from '../../abstractions/product/types/change-description'
import { ChangeProductExistence } from '../../abstractions/product/types/change-existence'
import { ChangeProductImage } from '../../abstractions/product/types/change-image'
import { ChangeProductName } from '../../abstractions/product/types/change-name'
import { ChangeProductPrice } from '../../abstractions/product/types/change-price'
import { CreateProduct } from '../../abstractions/product/types/CreateProduct'
import { GetProductsByFranchiseDTO } from '../../abstractions/product/types/get-products-franchise-dto'
import { GetProductsByProviderDTO } from '../../abstractions/product/types/get-products-provider-dto'
import { Product } from '../../abstractions/product/types/product'
import { ProductDetail } from '../../abstractions/product/types/product-detail'

export const useProductServiceHttp = (http: UseHttp): UseProductService => {
    const get = async (page: number): Promise<Product[]> => {
        const { job } = http.get<any, { products: Product[] }>({
            url: `/product/list/${page}`,
        })
        const data = await job()
        return data.body?.products || []
    }

    const getByTerm = async (
        term: string,
        page: number,
    ): Promise<Product[]> => {
        const { job } = http.get<any, { products: Product[] }>({
            url: `/product/search`,
            queries: {
                term,
                page: String(page),
            },
        })
        const data = await job()
        return data.body?.products || []
    }

    const getDetail = async (id: string): Promise<ProductDetail> => {
        const { job } = http.get<any, ProductDetail>({
            url: `/product/${id}`,
        })
        const data = await job()
        return data.body!!
    }

    const create = async (token: string, dto: CreateProduct) => {
        const { image, ...body } = dto
        const { job } = http.upload(
            {
                url: '/product/create',
                headers: {
                    auth: token,
                },
                files: {
                    image,
                },
                body,
            },
            () => {},
        )
        await job()
        return true
    }

    const getByFranchise = async (data: GetProductsByFranchiseDTO) => {
        const { job } = http.get<unknown, { products: Product[] }>({
            url: 'product/list/franchise' + data.franchise,
            queries: data,
        })
        return (await job()).body!!.products
    }

    const getByProvider = async (
        token: string,
        data: GetProductsByProviderDTO,
    ) => {
        const { job } = http.get<unknown, { products: Product[] }>({
            url: '/product/list/provider',
            headers: {
                auth: token,
            },
            queries: {
                page: String(data.page),
                term: data.term || '',
            },
        })
        return (await job()).body!!.products
    }

    const deleteProduct = async (token: string, id: string) => {
        const { job } = http.delete<unknown, unknown>({
            url: '/product/' + id,
            headers: {
                auth: token,
            },
        })
        await job()
        return true
    }

    const changeName = async (token: string, data: ChangeProductName) => {
        const { job } = http.put<ChangeProductName, unknown>({
            url: '/product/update-name/' + data.id,
            headers: {
                auth: token,
            },
            body: data,
        })
        await job()
        return true
    }

    const changeDescription = async (
        token: string,
        data: ChangeProductDescription,
    ) => {
        const { job } = http.put<ChangeProductDescription, unknown>({
            url: '/product/update-description/' + data.id,
            headers: {
                auth: token,
            },
            body: data,
        })
        await job()
        return true
    }

    const changePrice = async (token: string, data: ChangeProductPrice) => {
        const { job } = http.put<ChangeProductPrice, unknown>({
            url: '/product/update-price/' + data.id,
            headers: {
                auth: token,
            },
            body: data,
        })
        await job()
        return true
    }

    const changeExistence = async (
        token: string,
        data: ChangeProductExistence,
    ) => {
        const { job } = http.put<ChangeProductExistence, unknown>({
            url: '/product/update-existence/' + data.id,
            headers: {
                auth: token,
            },
            body: data,
        })
        await job()
        return true
    }

    const changeImage = async (token: string, dto: ChangeProductImage) => {
        const { image, ...body } = dto
        const { job } = http.upload(
            {
                url: '/product/update-image/' + dto.id,
                headers: {
                    auth: token,
                },
                files: {
                    image,
                },
                body,
            },
            () => {},
        )
        await job()
        return true
    }

    return {
        get,
        getDetail,
        getByTerm,
        create,
        getByFranchise,
        getByProvider,
        delete: deleteProduct,
        changeName,
        changeDescription,
        changePrice,
        changeExistence,
        changeImage,
    }
}
