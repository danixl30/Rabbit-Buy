import { ApiProperty } from '@nestjs/swagger'
import { IsUUID } from 'class-validator'

export class AddDeleteCategory {
    @ApiProperty()
    @IsUUID()
    id: string
    @ApiProperty()
    @IsUUID()
    category: string
}
