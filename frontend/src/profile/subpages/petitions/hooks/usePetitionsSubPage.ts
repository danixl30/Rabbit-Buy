import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { UseSession } from '../../../../core/abstractions/session/session'
import { UserState } from '../../../../global-state/user/UserContext'
import { UsePetition } from '../../../../services/abstractions/petition/petition-service'
import { Petition } from '../../../../services/abstractions/petition/types/petition'

export const usePetitionsSubPage = (
    service: UsePetition,
    session: UseSession,
    state: UserState,
) => {
    const [term, setTerm] = useState('')
    const [petitions, setPetions] = useState<Petition[]>([])
    const [page, setPage] = useState(1)
    const [isTop, setIsTop] = useState(false)

    const onSubmit = (value: string) => {
        setPage(1)
        setPetions([])
        setTerm(value)
    }

    const onGetMore = () => setPage(page + 1)

    const getPetition = async () => {
        if (state.user?.role === 'PROVIDER') {
            try {
                const data = await service.getFranchise(
                    session.getSession()!!,
                    page,
                )
                if (data.length < 1) setIsTop(true)
                setPetions([...petitions, ...data])
            } catch (e) {
                console.log(e)
            }
            return
        }
        try {
            const data = await service.getClient(session.getSession()!!, page)
            if (data.length < 1) setIsTop(true)
            setPetions([...petitions, ...data])
        } catch (e) {
            console.log(e)
        }
    }

    const getPetitionByTerm = async () => {
        if (state.user?.role === 'PROVIDER') {
            try {
                const data = await service.getFranchiseTerm(
                    session.getSession()!!,
                    page,
                    term,
                )
                if (data.length < 1) setIsTop(true)
                if (page > 1) setPetions([...petitions, ...data])
                else setPetions(data)
            } catch (e) {
                console.log(e)
            }
            return
        }
        try {
            const data = await service.getClientTerm(
                session.getSession()!!,
                page,
                term,
            )
            if (data.length < 1) setIsTop(true)
            setPetions([...petitions, ...data])
        } catch (e) {
            console.log(e)
        }
    }

    const confirmPetition = async (id: string) => {
        try {
            await service.confirmPetition(session.getSession()!!, id)
            toast.success('Pedido confirmado')
            setPetions(
                petitions.map((e) => {
                    if (e.id === id) {
                        return {
                            ...e,
                            status: 'CONFIRMED',
                        }
                    }
                    return { ...e }
                }),
            )
        } catch (e) {
            toast.error('Error al confirmar el pedido')
        }
    }

    const suspendPetition = async (id: string) => {
        try {
            await service.suspendPetition(session.getSession()!!, id)
            toast.success('Pedido suspendido')
            setPetions(
                petitions.map((e) => {
                    if (e.id === id) {
                        return {
                            ...e,
                            status: 'PAUSED',
                        }
                    }
                    return { ...e }
                }),
            )
        } catch (e) {
            toast.error('Error al confirmar el pedido')
        }
    }

    const cancelPetition = async (id: string) => {
        try {
            await service.cancelPetition(session.getSession()!!, id)
            toast.success('Pedido cancelado')
            setPetions(
                petitions.map((e) => {
                    if (e.id === id) {
                        return {
                            ...e,
                            status: 'CANCELLED',
                        }
                    }
                    return { ...e }
                }),
            )
        } catch (e) {
            toast.error('Error al confirmar el pedido')
        }
    }

    const finishPetition = async (id: string) => {
        try {
            await service.finishPetition(session.getSession()!!, id)
            toast.success('Pedido finalizado')
            setPetions(
                petitions.map((e) => {
                    if (e.id === id) {
                        return {
                            ...e,
                            status: 'FINISHED',
                        }
                    }
                    return { ...e }
                }),
            )
        } catch (e) {
            toast.error('Error al confirmar el pedido')
        }
    }

    useEffect(() => {
        if (page < 2) return
        if (!term) getPetition()
        else getPetitionByTerm()
    }, [page])

    useEffect(() => {
        if (!term) getPetition()
        else getPetitionByTerm()
    }, [term])

    useEffect(() => {
        if (!term) getPetition()
        else getPetitionByTerm()
    }, [])

    return {
        onGetMore,
        onSubmit,
        isTop,
        petitions,
        confirmPetition,
        finishPetition,
        cancelPetition,
        suspendPetition,
    }
}
