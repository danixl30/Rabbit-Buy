import { useEffect, useState } from 'react'
import { Optional } from '../utils/types/optional'

export const useImage = (image: Optional<File>) => {
    const [imageText, setImageText] = useState('')

    const readImage = () => {
        const reader = new FileReader()
        reader.onload = () => {
            setImageText(String(reader.result) || '')
        }
        reader.readAsDataURL(image!!)
    }

    useEffect(() => {
        if (!image) {
            setImageText('')
            return
        }
        readImage()
    }, [image])

    return {
        imageText,
    }
}
