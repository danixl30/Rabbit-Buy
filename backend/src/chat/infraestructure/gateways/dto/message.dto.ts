import { IsString, IsUUID } from 'class-validator'

export class MessageDTO {
    @IsUUID()
    chat: string
    @IsUUID()
    from: string
    @IsString()
    body: string
}
