import { ApiProperty } from '@nestjs/swagger'
import { Length } from 'class-validator'

export class UpdateNameDTO {
    @ApiProperty()
    @Length(5, 20)
    name: string
    @ApiProperty()
    id: string
}
