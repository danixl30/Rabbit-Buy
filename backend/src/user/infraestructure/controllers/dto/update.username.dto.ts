import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Length } from 'class-validator'

export class UpdateUsernameDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(5, 20)
    username: string
}
