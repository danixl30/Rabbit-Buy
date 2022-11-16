import { ApiProperty } from '@nestjs/swagger'
import { Length, Matches } from 'class-validator'
import { regExpRif } from 'src/utils/reg-exps/rif/rif.reg.exp'
import { Express } from 'express'

export class CreateFranchiseRequestDTO {
    @ApiProperty()
    @Length(5, 20)
    name: string
    @ApiProperty()
    @Matches(regExpRif)
    rif: string
    @ApiProperty({ type: 'string', format: 'binary', required: true })
    image?: Express.Multer.File
}
