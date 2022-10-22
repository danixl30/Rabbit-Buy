import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsString, Length, Max, ValidateIf } from 'class-validator'
import { regExpUUID } from 'src/utils/reg-exps/UUID/UUID.reg.exp'

export class CreateProductRequestDTO {
    @ApiProperty()
    @IsString()
    //@Length(5, 20)
    name: string
    @ApiProperty()
    @IsString()
    //@Max(500)
    description: string
    @ApiProperty()
    @ValidateIf((o) => o.price >= 0)
    price: number
    @ApiProperty()
    @IsString()
    currency: string
    @ApiProperty()
    //@ValidateIf(o => o.existence >= 0)
    existence: number
    @ApiProperty()
    //@ValidateIf(o => !Boolean(o.categories.find((e: string) => !regExpUUID.test(e))))
    categories: string[]
    @ApiProperty({ type: 'string', format: 'binary', required: true })
    image?: Express.Multer.File
}
