import { UseHttp } from '../../../core/abstractions/http/http'
import { UseSocket } from '../../../core/abstractions/sockets/socket'
import { User } from '../../../global-state/user/types/user'
import { ChatClient } from '../../abstractions/chat/types/chat-client'
import { ChatProvider } from '../../abstractions/chat/types/chat-provider'
import { CreateChatByClientDTO } from '../../abstractions/chat/types/create-chat-client'
import { CreateChatByProviderDTO } from '../../abstractions/chat/types/create-chat-provider'
import { Message } from '../../abstractions/chat/types/message'
import { SendMessageDTO } from '../../abstractions/chat/types/send-message'

export const useChatService = (http: UseHttp, socket: UseSocket) => {
    const getChatsByClient = async (token: string): Promise<ChatClient[]> => {
        const { job } = http.get<unknown, ChatClient[]>({
            url: '/chat/list/client',
            headers: {
                auth: token,
            },
        })
        return (await job()).body!!
    }
    const getChatsByProvider = async (
        token: string,
    ): Promise<ChatProvider[]> => {
        const { job } = http.get<unknown, ChatProvider[]>({
            url: '/chat/list/provider',
            headers: {
                auth: token,
            },
        })
        return (await job()).body!!
    }
    const createChatByClient = async (
        token: string,
        dto: CreateChatByClientDTO,
    ): Promise<void> => {
        const { job } = http.post<CreateChatByClientDTO, unknown>({
            url: '/chat/create/client',
            headers: {
                auth: token,
            },
            body: dto,
        })
        await job()
    }
    const createChatByProvider = async (
        token: string,
        dto: CreateChatByProviderDTO,
    ): Promise<void> => {
        const { job } = http.post<CreateChatByProviderDTO, unknown>({
            url: '/chat/create/provider',
            headers: {
                auth: token,
            },
            body: dto,
        })
        await job()
    }
    const listMessages = async (
        token: string,
        chat: ChatProvider | ChatClient,
        page: number,
    ): Promise<Message[]> => {
        const { job } = http.get<unknown, Message[]>({
            url: '/chat/messages/' + chat.id,
            headers: {
                auth: token,
            },
            queries: {
                page: String(page),
            },
        })
        return (await job()).body!!
    }
    const onMessage = (callback: (message: Message) => void): void => {
        socket.subscribeEvent('message', callback)
    }
    const sendMessage = async (dto: SendMessageDTO): Promise<void> => {
        socket.emit('message', dto)
    }
    const onTyping = (callback: (name: string) => void): void => {
        socket.subscribeEvent<{ name: string }>('typing', (e) =>
            callback(e.name),
        )
    }
    const sendTyping = async (name: string): Promise<void> => {
        socket.emit('typing', {
            name,
        })
    }
    const subscribe = async (
        chat: ChatProvider | ChatClient,
        user: User,
    ): Promise<void> => {
        socket.emit('subscribe', {
            chat: chat.id,
            userId: user.id,
        })
    }
    const unsubscribe = async (): Promise<void> => {
        socket.emit<{}>('unsubscribe', {})
    }

    return {
        getChatsByClient,
        getChatsByProvider,
        createChatByClient,
        createChatByProvider,
        listMessages,
        onMessage,
        sendMessage,
        onTyping,
        sendTyping,
        subscribe,
        unsubscribe,
    }
}
