import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsUUID } from 'class-validator'

export class CreateChatByClientDTO {
    @ApiProperty()
    @IsString()
    @IsUUID()
    franchise: string
}
