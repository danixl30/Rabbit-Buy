import { Module } from '@nestjs/common'
import { CloudinaryImageStorage } from '../service/cloudinary.service'

@Module({
    providers: [CloudinaryImageStorage],
    exports: [CloudinaryImageStorage],
})
export class CloudinaryImageModule {}
