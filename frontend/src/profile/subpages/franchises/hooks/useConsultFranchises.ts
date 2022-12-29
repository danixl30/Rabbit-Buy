import { useEffect, useState } from 'react'
import { UseSession } from '../../../../core/abstractions/session/session'
import { UseToast } from '../../../../core/abstractions/toast/toast'
import { UseFranchise } from '../../../../services/abstractions/franchise/franchise-service'
import { Franchise } from '../../../../services/abstractions/franchise/types/franchise'
import { FranchiseDetail } from '../../../../services/abstractions/franchise/types/franchise-detail'
import { Optional } from '../../../../utils/types/optional'

export const useConsultFranchise = (
    service: UseFranchise,
    session: UseSession,
    toast: UseToast,
) => {
    const [name, setName] = useState('')
    const [errorName, setErrorName] = useState('')
    const [image, setImage] = useState<File>()

    const [selected, setSelected] = useState('')
    const [franchise, setFranchise] = useState<FranchiseDetail>()
    const [franchises, setFranchises] = useState<Franchise[]>([])
    const [loading, setLoading] = useState(false)

    const onChangeName = (value: string) => setName(value)

    const getFranchises = async () => {
        setLoading(true)
        try {
            const data = await service.getAll(session.getSession()!!)
            setFranchises(data)
        } catch (e) {
            toast.error('Error al listar las franquicias')
        }
        setLoading(false)
    }

    const getFranchise = async () => {
        try {
            const data = await service.getDetail(
                session.getSession()!!,
                selected,
            )
            setFranchise(data)
            setName(data.name)
        } catch (e) {
            toast.error('Error al listar las franquicias')
        }
    }

    const onChangeImage = (image: Optional<File>) => {
        if (!image) {
            setImage(undefined)
            return
        }
        if (!image.type.toLowerCase().includes('image')) {
            toast.error('Debe ser una imagen')
            return
        }
        setImage(image)
    }

    useEffect(() => {
        getFranchises()
    }, [])

    useEffect(() => {
        setName('')
        setErrorName('')
        if (selected) {
            getFranchise()
        }
    }, [selected])

    useEffect(() => {
        if (name && name.length < 5) setErrorName('Nombre muy corto')
        else if (name && name.length > 20) setErrorName('Nombre muy largo')
        else setErrorName('')
    }, [name])

    const onClickFranchise = (e: Franchise) => setSelected(e.id)

    const onCloseDetail = () => {
        setSelected('')
        setFranchise(undefined)
        setImage(undefined)
    }

    return {
        franchises,
        franchise,
        onCloseDetail,
        onClickFranchise,
        loading,
        name,
        onChangeName,
        errorName,
        onChangeImage,
        image,
    }
}
