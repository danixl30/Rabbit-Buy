import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length } from 'class-validator'

export class UpdateDescriptionDTO {
    @ApiProperty()
    @IsString()
    @Length(0, 500)
    description: string
}
