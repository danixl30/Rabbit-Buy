import { useState } from 'react'

export const useCreateProduct = () => {
    const [name, setName] = useState('')
    const [rif, setRif] = useState('')

    const onChangeName = (value: string) => setName(value)

    const onChangeRif = (value: string) => setRif(value.trim())

    return {
        name,
        rif,
        onChangeName,
        onChangeRif,
    }
}
