import { useState, useEffect } from 'react'
import { UseSession } from '../../core/abstractions/session/session'
import { UseToast } from '../../core/abstractions/toast/toast'
import { User } from '../../global-state/user/types/user'
import { UseChat } from '../../services/abstractions/chat/chat-service'
import { ChatClient } from '../../services/abstractions/chat/types/chat-client'
import { ChatProvider } from '../../services/abstractions/chat/types/chat-provider'

export const useChat = (
    chatService: UseChat,
    user: User,
    session: UseSession,
    toast: UseToast,
) => {
    const [chatsClient, setChatsClient] = useState<ChatClient[]>([])
    const [chatsProvider, setChatsProvider] = useState<ChatProvider[]>([])
    const [loading, setLoading] = useState(false)
    const [chatSelected, setChatSelected] = useState<
        ChatClient | ChatProvider
    >()
    const [openAddChat, setOpenAddChat] = useState(false)

    const getChats = async () => {
        setLoading(true)
        try {
            if (user.role === 'USER') {
                const chats = await chatService.getChatsByClient(
                    session.getSession()!!,
                )
                setChatsClient(chats)
            }
            if (user.role === 'PROVIDER') {
                const chats = await chatService.getChatsByProvider(
                    session.getSession()!!,
                )
                setChatsProvider(chats)
            }
        } catch (e) {
            toast.error('Error al obtener los chats')
        }
        setLoading(false)
    }

    const selectChat = (chat: ChatClient | ChatProvider) => {
        setChatSelected(undefined)
        setChatSelected(chat)
    }

    const openAddChatHandler = () => {
        setOpenAddChat(true)
    }

    const onCloseAddChat = () => {
        setOpenAddChat(false)
        getChats()
    }

    useEffect(() => {
        getChats()
    }, [])

    return {
        chatsClient,
        chatsProvider,
        loading,
        openAddChat,
        onCloseAddChat,
        selectChat,
        openAddChatHandler,
        chatSelected,
    }
}
