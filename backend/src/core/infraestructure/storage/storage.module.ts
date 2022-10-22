import { Module } from '@nestjs/common'
import { CloudinaryImageModule } from './image-cloudinary/module/cloudinary.image.module'

@Module({
    imports: [CloudinaryImageModule],
    exports: [CloudinaryImageModule],
})
export class StorageModule {}
