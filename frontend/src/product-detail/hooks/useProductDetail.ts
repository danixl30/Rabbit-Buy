import { useEffect, useState } from 'react'
import { UseNavigation } from '../../core/abstractions/navigation/navigation'
import { UseSession } from '../../core/abstractions/session/session'
import { UseToast } from '../../core/abstractions/toast/toast'
import { UsePetition } from '../../services/abstractions/petition/petition-service'
import { UseProductService } from '../../services/abstractions/product/product-service'
import { ProductDetail } from '../../services/abstractions/product/types/product-detail'

export const useProductDetail = (
    navigation: UseNavigation,
    productService: UseProductService,
    petitionService: UsePetition,
    toast: UseToast,
    session: UseSession,
) => {
    const [product, setProduct] = useState<ProductDetail>()
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [quantity, setQuantity] = useState(1)

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

    const onChangeQuantity = (value: number) => setQuantity(value)

    const onMakePetition = async () => {
        const onResult = toast.pending('Procesando...')
        console.log(quantity)
        try {
            await petitionService.make(session.getSession()!!, {
                product: product!!.id,
                quantity,
            })
            onResult('Pedido realizado satisfactoriamente', 'success')
            getData()
        } catch (e) {
            onResult('Error al realizar el pedido', 'error')
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return {
        product,
        isLoading,
        isError,
        quantity,
        onMakePetition,
        onChangeQuantity,
    }
}
