import { ApiProperty } from '@nestjs/swagger'

export class UpdateImageDTO {
    @ApiProperty({ type: 'string', format: 'binary', required: true })
    image?: Express.Multer.File
}
