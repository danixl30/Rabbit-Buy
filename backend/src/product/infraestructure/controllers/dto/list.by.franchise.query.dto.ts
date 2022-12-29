import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, ValidateIf } from 'class-validator'

export class ListByFranchiseQueryDTO {
    @ApiProperty()
    @ValidateIf((o) => Number(o.page) > 0)
    page: number
    @ApiPropertyOptional()
    @IsOptional()
    text?: string
}
