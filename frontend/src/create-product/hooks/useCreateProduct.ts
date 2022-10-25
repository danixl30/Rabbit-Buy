import { useState } from 'react'
import { UseToast } from '../../core/abstractions/toast/toast'
import { Optional } from '../../utils/types/optional'

export const useCreateProduct = (toast: UseToast) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [existence, setExistence] = useState(0)
    const [price, setPrice] = useState(0)
    const [currency, setCurrency] = useState('')
    const [image, setImage] = useState<File>()

    const onChangeName = (value: string) => setName(value)
    const onChangeDescription = (value: string) => setDescription(value)
    const onChangeCurrency = (value: string) => setCurrency(value)
    const onChangeExistence = (value: number) => {
        if (value < 0) {
            toast.error('Existencia invalida')
            setExistence(0)
            return
        }
        setExistence(value)
    }
    const onChangePrice = (value: number) => {
        if (value < 0) {
            toast.error('Precio invalida')
            setPrice(0)
            return
        }
        setPrice(value)
    }
    const onChangeImage = (image: Optional<File>) => {
        if (!image) {
            setImage(undefined)
            return
        }
        if (!image.type.includes('image')) {
            toast.error('Debe ser una imagen')
            return
        }
        setImage(image)
    }

    return {
        name,
        description,
        price,
        currency,
        existence,
        image,
        onChangeName,
        onChangeImage,
        onChangePrice,
        onChangeCurrency,
        onChangeDescription,
        onChangeExistence,
    }
}
