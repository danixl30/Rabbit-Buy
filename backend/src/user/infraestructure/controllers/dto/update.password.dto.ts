import { ApiProperty } from '@nestjs/swagger'
import { Length, ValidateIf } from 'class-validator'
import { regExpPassword } from 'src/utils/reg-exps/password/password.reg.exp'

export class UpdatePasswordDTO {
    @ApiProperty()
    @Length(6, 15)
    @ValidateIf(
        (e) =>
            regExpPassword.test(e.password) && e.password === e.confirmPassword,
    )
    password: string
}
