import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsUUID, Length } from 'class-validator'

export class ModifyCategoryDTO {
    @ApiProperty()
    @IsString()
    @Length(5, 20)
    name: string
    @IsUUID()
    id: string
}
