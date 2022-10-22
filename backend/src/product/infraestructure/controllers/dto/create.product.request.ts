import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length, ValidateIf } from 'class-validator'

export class CreateProductRequestDTO {
    @ApiProperty()
    @IsString()
    @Length(5, 20)
    name: string
    @ApiProperty()
    @IsString()
    @Length(0, 500)
    description: string
    @ApiProperty()
    @ValidateIf((o) => o.price >= 0)
    price: number
    @ApiProperty()
    @IsString()
    currency: string
    @ApiProperty()
    @ValidateIf(
        (o) => o.existence >= 0 && Math.ceil(o.existence) === o.existence,
    )
    existence: number
    @ApiProperty()
    categories: string[]
    @ApiProperty({ type: 'string', format: 'binary', required: true })
    image?: Express.Multer.File
}
