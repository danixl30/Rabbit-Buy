import { useEffect, useState } from 'react'
import { UseNavigation } from '../../core/abstractions/navigation/navigation'
import { LOGIN_PAGE } from '../../login/page/route'
import { UseProductService } from '../../services/abstractions/product-service'
import { Product } from '../../services/abstractions/types/product'
import { MAIN_PAGE } from '../page/route'

export const useMainPage = (
    navigation: UseNavigation,
    productService: UseProductService,
) => {
    const [products, setProducts] = useState<Product[]>([])
    const [page, setPage] = useState(1)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isTop, setIsTop] = useState(false)
    const [inputSearch, setInputSearch] = useState('')

    const findProducts = async () => {
        setIsError(false)
        try {
            const res = await productService.get(page)
            if (res.length === 0) setIsTop(true)
            setProducts([...products, ...res])
        } catch (e) {
            setIsError(true)
        }
        setIsLoading(false)
    }

    const findProductsByParams = async () => {
        setIsError(false)
        try {
            const res = await productService.getByTerm(
                navigation.getQuery('term')!!,
                page,
            )
            if (res.length === 0) setIsTop(true)
            setProducts([...products, ...res])
        } catch (e) {
            setIsError(true)
        }
        setIsLoading(false)
    }

    const onClickShowMore = () => {
        setPage((page) => page + 1)
    }

    useEffect(() => {
        if (navigation.getQuery('term')) {
            findProductsByParams()
            return
        }
        findProducts()
    }, [])

    useEffect(() => {
        if (navigation.getQuery('term')) {
            findProductsByParams()
            return
        }
        findProducts()
    }, [page])

    const goToLogin = () => navigation.goTo(LOGIN_PAGE)

    const onChangeInputSearch = (data: string) => {
        setInputSearch(data)
    }

    const onSubmitSearch = () => {
        if (!inputSearch) {
            navigation.goTo(MAIN_PAGE)
            window.location.reload()
            return
        }
        navigation.goTo(`?term=${inputSearch}`)
        window.location.reload()
    }

    const onClickProduct = (product: Product) =>
        navigation.goTo('/detail/' + product.id)

    return {
        onClickShowMore,
        isLoading,
        products,
        isError,
        isTop,
        onChangeInputSearch,
        inputSearch,
        onSubmitSearch,
        onClickProduct,
    }
}
