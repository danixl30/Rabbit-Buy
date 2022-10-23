import { ApiProperty } from '@nestjs/swagger'
import { IsUUID, ValidateIf } from 'class-validator'

export class CreatePetitionRequestDTO {
    @ApiProperty()
    @IsUUID()
    product: string
    @ApiProperty()
    @ValidateIf((o) => o.existence > 0 && o.existence.nextInt() === o.existence)
    quantity: number
}
