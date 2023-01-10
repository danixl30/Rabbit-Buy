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
            const data = await service.getAll()
            setFranchises(data)
        } catch (e) {
            toast.error('Error al listar las franquicias')
        }
        setLoading(false)
    }

    const onClickChangeName = async () => {
        if (!name || errorName) {
            toast.error('Nombre invalido')
            return
        }
        const onFinish = toast.pending('Procesando...')
        try {
            await service.changeName(session.getSession()!!, {
                id: franchise?.id || '',
                name,
            })
            onFinish('Los cambios se realizaron con exito', 'success')
            getFranchises()
        } catch (e) {
            onFinish('Error al realizar los cambios', 'error')
        }
    }

    const onClickChangeImage = async () => {
        if (!image) {
            toast.error('Imagen invalida')
            return
        }
        const onFinish = toast.pending('Procesando...')
        try {
            await service.changeImage(session.getSession()!!, {
                id: franchise?.id || '',
                image,
            })
            onFinish('Los cambios se realizaron con exito', 'success')
            getFranchises()
        } catch (e) {
            onFinish('Error al realizar los cambios', 'error')
        }
    }

    const onClickChangeGroupId = async () => {
        const onFinish = toast.pending('Procesando...')
        try {
            await service.generateGroupId(
                session.getSession()!!,
                franchise!!.id,
            )
            onFinish('Los cambios se realizaron con exito', 'success')
            getFranchise()
        } catch (e) {
            onFinish('Error al realizar los cambios', 'error')
        }
    }

    const onClickDelete = async () => {
        const onFinish = toast.pending('Pending...')
        try {
            await service.delete(session.getSession()!!, franchise!!.id)
            onFinish('Franquicia borrado satisfactoriamente', 'success')
            onCloseDetail()
            getFranchises()
        } catch (e) {
            onFinish('Error al borrar la franquicia', 'error')
        }
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
        onClickChangeName,
        onClickChangeGroupId,
        onClickChangeImage,
        onClickDelete,
    }
}
