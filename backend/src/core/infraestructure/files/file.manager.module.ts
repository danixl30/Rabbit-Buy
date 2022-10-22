import { Module } from '@nestjs/common'
import { FsModule } from './fs/module/fs.module'

@Module({
    imports: [FsModule],
    exports: [FsModule],
})
export class FileManagerModule {}
