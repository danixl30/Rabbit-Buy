import { ApiProperty } from '@nestjs/swagger'
import { ValidateIf } from 'class-validator'

export class UpdateExistenceDTO {
    @ApiProperty()
    @ValidateIf((o) => o.existence >= 0)
    existence: number
}
