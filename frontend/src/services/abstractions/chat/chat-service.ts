import { User } from '../../../global-state/user/types/user'
import { ChatClient } from './types/chat-client'
import { ChatProvider } from './types/chat-provider'
import { CreateChatByClientDTO } from './types/create-chat-client'
import { CreateChatByProviderDTO } from './types/create-chat-provider'
import { Message } from './types/message'
import { SendMessageDTO } from './types/send-message'

export type UseChat = {
    getChatsByClient(token: string): Promise<ChatClient[]>
    getChatsByProvider(token: string): Promise<ChatProvider[]>
    createChatByClient(token: string, dto: CreateChatByClientDTO): Promise<void>
    createChatByProvider(
        token: string,
        dto: CreateChatByProviderDTO,
    ): Promise<void>
    listMessages(
        token: string,
        chat: ChatProvider | ChatClient,
        page: number,
    ): Promise<Message[]>
    onMessage(callback: (message: Message) => void): void
    sendMessage(dto: SendMessageDTO): Promise<void>
    onTyping(callback: (name: string) => void): void
    sendTyping(name: string): Promise<void>
    subscribe(chat: ChatProvider | ChatClient, user: User): Promise<void>
    unsubscribe(): Promise<void>
}
