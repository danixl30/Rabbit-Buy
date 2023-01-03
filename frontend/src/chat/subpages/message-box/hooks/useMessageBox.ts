import { useState, useEffect } from 'react'
import { UseSession } from '../../../core/abstractions/session/session'
import { UseToast } from '../../../core/abstractions/toast/toast'
import { User } from '../../../global-state/user/types/user'
import { UseChat } from '../../../services/abstractions/chat/chat-service'
import { ChatClient } from '../../../services/abstractions/chat/types/chat-client'
import { ChatProvider } from '../../../services/abstractions/chat/types/chat-provider'
import { Message } from '../../../services/abstractions/chat/types/message'

export const useMessageBox = (
    chat: ChatClient | ChatProvider,
    chatService: UseChat,
    user: User,
    session: UseSession,
    toast: UseToast,
) => {
    const [messages, setMessages] = useState<Message[]>([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [typing, setTyping] = useState('')
    const [body, setBody] = useState('')

    const getMessages = async () => {
        setLoading(true)
        try {
            const data = await chatService.listMessages(
                session.getSession()!!,
                chat,
                page,
            )
            setMessages([...messages, ...data])
        } catch (e) {
            toast.error('Error al obtener los mensajes')
        }
        setLoading(false)
    }

    const onChangeInput = (value: string) => {
        setBody(value)
        chatService.sendTyping(user.username)
    }

    const sendMessage = () => {
        chatService.sendMessage({
            body,
            from: user.id,
            chat: chat.id,
        })
        chatService.sendTyping('')
    }

    const incrementPage = () => {
        if (!loading) setPage(page + 1)
    }

    useEffect(() => {
        if (!loading) getMessages()
    }, [page])

    useEffect(() => {
        chatService.subscribe(chat, user)
        chatService.onMessage((message) => setMessages([message, ...messages]))
        chatService.onTyping((name) => setTyping(name))
        return () => {
            chatService.unsubscribe()
        }
    }, [])

    return {
        typing,
        messages,
        incrementPage,
        onChangeInput,
        loading,
        body,
        sendMessage,
    }
}
