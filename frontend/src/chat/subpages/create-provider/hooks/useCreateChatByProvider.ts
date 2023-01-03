import { useState, useEffect } from 'react'
import { UseSession } from '../../../../core/abstractions/session/session'
import { UseToast } from '../../../../core/abstractions/toast/toast'
import { User } from '../../../../global-state/user/types/user'
import { UseChat } from '../../../../services/abstractions/chat/chat-service'
import { UseUserService } from '../../../../services/abstractions/user/user-service'

export const useCreateChatByProvider = (
    userService: UseUserService,
    chatService: UseChat,
    session: UseSession,
    toast: UseToast,
    callback?: () => void,
) => {
    const [users, setUsers] = useState<User[]>([])
    const [usersFiltered, setUsersFiltered] = useState<User[]>([])
    const [loading, setLoading] = useState(false)
    const [text, setText] = useState('')

    const getUsers = async () => {
        setLoading(true)
        try {
            const users = await userService.getClients(session.getSession()!!)
            setUsers(users)
        } catch (e) {
            toast.error('Error al listar las franquicias')
        }
        setLoading(false)
    }

    const filterUsers = () => {
        setUsersFiltered(
            users.filter(
                (user) =>
                    user.username.toLowerCase().includes(text.toLowerCase()) ||
                    user.email.toLowerCase().includes(text.toLowerCase()),
            ),
        )
    }

    const selectUser = async (user: User) => {
        const onFinish = toast.pending('Procesando')
        try {
            await chatService.createChatByProvider(session.getSession()!!, {
                client: user.id,
            })
            onFinish('Chat creado satisfactoriamente', 'success')
        } catch (e) {
            onFinish('Error al crear el chat', 'error')
        }
        callback?.()
    }

    useEffect(() => {
        if (users.length === 0) getUsers()
        filterUsers()
    }, [text, users])
}
