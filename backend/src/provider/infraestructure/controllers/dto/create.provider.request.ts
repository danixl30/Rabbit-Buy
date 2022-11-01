import { ApiProperty } from '@nestjs/swagger'
import { IsUUID } from 'class-validator'
import { RegisterUserRequestDTO } from 'src/user/infraestructure/controllers/dto/register.user.request'

export class CreateProviderRequestDTO extends RegisterUserRequestDTO {
    @ApiProperty()
    @IsUUID('4')
    groupId: string
}
