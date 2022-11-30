import { ApiProperty } from '@nestjs/swagger'
import { ValidateIf } from 'class-validator'

export class UpdatePriceDTO {
    @ApiProperty()
    @ValidateIf((o) => o.price >= 0)
    price: number
}
