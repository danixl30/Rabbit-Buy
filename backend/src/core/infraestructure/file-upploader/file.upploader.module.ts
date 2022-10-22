import { Module } from '@nestjs/common'
import { MulterConfigModule } from './multer/multer.module'

@Module({
    imports: [MulterConfigModule],
})
export class FileUpploaderModule {}
