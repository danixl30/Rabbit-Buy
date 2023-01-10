import { IsString, IsUUID } from 'class-validator'

export class MessageDTO {
    @IsUUID()
    chat: string
    @IsUUID()
    userFrom: string
    @IsString()
    body: string
}
