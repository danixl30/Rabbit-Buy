import { IsString, IsUUID } from 'class-validator'

export class TypingDTO {
    @IsString()
    name: string
    @IsUUID()
    chat: string
}
