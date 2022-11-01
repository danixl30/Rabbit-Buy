import { ApiProperty } from '@nestjs/swagger'
import {
    IsString,
    IsNotEmpty,
    IsEmail,
    Length,
    ValidateIf,
} from 'class-validator'
import { regExpPassword } from 'src/utils/reg-exps/password/password.reg.exp'

export class RegisterUserRequestDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(5, 20)
    username: string
    @ApiProperty()
    @IsEmail()
    email: string
    @ApiProperty()
    @Length(6, 15)
    @ValidateIf(
        (e) =>
            regExpPassword.test(e.password) && e.password === e.confirmPassword,
    )
    password: string
    @ApiProperty()
    @Length(6, 15)
    confirmPassword: string
}
