import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsUUID, Length } from 'class-validator'

export class CreateSubCategoryDTO {
    @ApiProperty()
    @IsString()
    @Length(5, 20)
    name: string
    @ApiProperty()
    @IsUUID()
    parent: string
}
