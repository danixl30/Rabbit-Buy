import { ApiProperty } from '@nestjs/swagger'
import { RegisterUserRequestDTO } from './register.user.request'
import { IsNotEmpty } from 'class-validator'

export class RegisterAdminRequestDTO extends RegisterUserRequestDTO {
    @ApiProperty()
    @IsNotEmpty()
    secretPass: string
}
