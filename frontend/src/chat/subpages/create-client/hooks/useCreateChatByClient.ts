import { useState, useEffect } from 'react'
import { UseSession } from '../../../../core/abstractions/session/session'
import { UseToast } from '../../../../core/abstractions/toast/toast'
import { UseChat } from '../../../../services/abstractions/chat/chat-service'
import { UseFranchise } from '../../../../services/abstractions/franchise/franchise-service'
import { Franchise } from '../../../../services/abstractions/franchise/types/franchise'

export const useCreateChatByClient = (
    franchiseService: UseFranchise,
    chatService: UseChat,
    session: UseSession,
    toast: UseToast,
    callback?: () => void,
) => {
    const [franchises, setFranchises] = useState<Franchise[]>([])
    const [franchiseFiltered, setFranchisesFiltered] = useState<Franchise[]>([])
    const [loading, setLoading] = useState(false)
    const [text, setText] = useState('')

    const getFranchises = async () => {
        setLoading(true)
        try {
            const franchises = await franchiseService.getAll()
            setFranchises(franchises)
        } catch (e) {
            toast.error('Error al listar las franquicias')
        }
        setLoading(false)
    }

    const filterFranchises = () => {
        setFranchisesFiltered(
            franchises.filter(
                (franchise) =>
                    franchise.name.toLowerCase().includes(text.toLowerCase()) ||
                    franchise.rif.toLowerCase().includes(text.toLowerCase()),
            ),
        )
    }

    const selectFranchise = async (franchise: Franchise) => {
        const onFinish = toast.pending('Procesando')
        try {
            await chatService.createChatByClient(session.getSession()!!, {
                franchise: franchise.id,
            })
            onFinish('Chat creado satisfactoriamente', 'success')
        } catch (e) {
            onFinish('Error al crear el chat', 'error')
        }
        callback?.()
    }

    useEffect(() => {
        if (franchises.length === 0) getFranchises()
        filterFranchises()
    }, [text, franchises])
}
