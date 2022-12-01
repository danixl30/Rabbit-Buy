import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length } from 'class-validator'

export class CreateCategoryDTO {
    @ApiProperty()
    @IsString()
    @Length(5, 20)
    name: string
}
