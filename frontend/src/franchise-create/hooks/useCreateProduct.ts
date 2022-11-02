import { useState, useEffect } from 'react'
import { UseNavigation } from '../../core/abstractions/navigation/navigation'
import { UseSession } from '../../core/abstractions/session/session'
import { UseToast } from '../../core/abstractions/toast/toast'
import { PROFILE_PAGE } from '../../profile/page/route'
import { UseFranchise } from '../../services/abstractions/franchise/franchise-service'
import { regExpRif } from '../../utils/reg-exps/rif/rif.reg.exp'

export const useCreateProduct = (
    service: UseFranchise,
    session: UseSession,
    toast: UseToast,
    navigation: UseNavigation,
) => {
    const [name, setName] = useState('')
    const [rif, setRif] = useState('')
    const [loading, setLoading] = useState(false)

    const [errorName, setErrorName] = useState('')
    const [errorRif, setErrorRif] = useState('')

    const onChangeName = (value: string) => setName(value)

    const onChangeRif = (value: string) => setRif(value.trim())

    const onSubmit = async () => {
        if (!submitable) {
            toast.warning('Datos inválidos')
            return
        }
        setLoading(true)
        const onResult = toast.pending('Procesando...')
        try {
            await service.create(session.getSession()!!, {
                name,
                rif,
            })
            onResult('Franquicia creada satisfactoriamente', 'success')
            navigation.goTo(PROFILE_PAGE)
        } catch (e: any) {
            onResult('Error al crear la franquicia', 'error')
        }
        setLoading(false)
    }

    useEffect(() => {
        if (name && name.length < 5) setErrorName('Nombre muy corto')
        else if (name.length > 20) setErrorName('Nombre muy largo')
        else setErrorName('')
    }, [name])

    useEffect(() => {
        if (rif && !regExpRif.test(rif)) setErrorRif('Rif inválido')
        else setErrorRif('')
    }, [rif])

    const submitable = name && rif && !errorRif && !errorName

    return {
        name,
        rif,
        onChangeName,
        onChangeRif,
        loading,
        submitable,
        onSubmit,
        errorRif,
        errorName,
    }
}
