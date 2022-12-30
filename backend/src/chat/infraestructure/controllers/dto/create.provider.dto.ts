import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsUUID } from 'class-validator'

export class CreateChatByProviderDTO {
    @ApiProperty()
    @IsString()
    @IsUUID()
    client: string
}
