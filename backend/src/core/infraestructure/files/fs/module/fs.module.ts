import { Module } from '@nestjs/common'
import { FileFsManager } from '../service/file.fs.manager'

@Module({
    providers: [FileFsManager],
    exports: [FileFsManager],
})
export class FsModule {}
