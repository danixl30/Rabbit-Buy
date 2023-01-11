import { useState, useEffect } from 'react'
import { UseSession } from '../../../../core/abstractions/session/session'
import { UseToast } from '../../../../core/abstractions/toast/toast'
import { User } from '../../../../global-state/user/types/user'
import { UseChat } from '../../../../services/abstractions/chat/chat-service'
import { ChatClient } from '../../../../services/abstractions/chat/types/chat-client'
import { ChatProvider } from '../../../../services/abstractions/chat/types/chat-provider'
import { Message } from '../../../../services/abstractions/chat/types/message'
import { MessagePresent } from '../types/message-present'

export const useMessageBox = (
    chat: ChatClient | ChatProvider,
    chatService: UseChat,
    user: User,
    session: UseSession,
    toast: UseToast,
) => {
    const [messages, setMessages] = useState<MessagePresent[]>([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [typing, setTyping] = useState('')
    const [body, setBody] = useState('')
    const [isTop, setIsTop] = useState(false)

    const isMessageOwn = (message: Message): MessagePresent => {
        if (user.role === 'USER' && message.from === user.id) {
            return {
                ...message,
                own: true,
            }
        }
        if (
            user.role === 'PROVIDER' &&
            message.from !== (chat as ChatProvider).clientId
        ) {
            return {
                ...message,
                own: true,
            }
        }
        return {
            ...message,
            own: false,
        }
    }

    const getMessages = async () => {
        setLoading(true)
        try {
            const data = await chatService.listMessages(
                session.getSession()!!,
                chat,
                page,
            )
            if (data.length < 20) {
                setIsTop(true)
            }
            const messagesMapped = data.map(isMessageOwn).reverse()
            setMessages([...messages, ...messagesMapped])
        } catch (e) {
            toast.error('Error al obtener los mensajes')
        }
        setLoading(false)
    }

    const onChangeInput = (value: string) => {
        setBody(value)
        chatService.sendTyping(user.username, chat.id)
    }

    const sendMessage = () => {
        chatService.sendMessage({
            body,
            userFrom: user.id,
            chat: chat.id,
        })
        setBody('')
        chatService.sendTyping('', chat.id)
    }

    const incrementPage = () => {
        if (isTop) return
        if (!loading) setPage(page + 1)
    }

    useEffect(() => {
        if (!loading) getMessages()
    }, [page])

    useEffect(() => {
        chatService.subscribe(chat, user)
        chatService.onMessage((message) => {
            if (messages.length === 0) {
                setMessages([])
                setPage(1)
                getMessages()
            } else setMessages([...messages, isMessageOwn(message)])
        })
        chatService.onTyping((name) => setTyping(name))
        return () => {
            chatService.off()
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
        isTop,
    }
}
