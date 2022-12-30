import { IsUUID } from 'class-validator'

export class SubscribeUnsubscribeChatDTO {
    @IsUUID()
    chat: string
    @IsUUID()
    userId: string
}
