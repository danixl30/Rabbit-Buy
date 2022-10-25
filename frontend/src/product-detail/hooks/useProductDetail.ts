import { useEffect, useState } from 'react'
import { UseNavigation } from '../../core/abstractions/navigation/navigation'
import { UseProductService } from '../../services/abstractions/product/product-service'
import { ProductDetail } from '../../services/abstractions/product/types/product-detail'

export const useProductDetail = (
    navigation: UseNavigation,
    productService: UseProductService,
) => {
    const [product, setProduct] = useState<ProductDetail>()
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    const getData = async () => {
        try {
            const res = await productService.getDetail(
                navigation.getParam('id'),
            )
            setProduct(res)
        } catch (e) {
            console.log(e)
            setIsError(true)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getData()
    }, [])

    return {
        product,
        isLoading,
        isError,
    }
}
