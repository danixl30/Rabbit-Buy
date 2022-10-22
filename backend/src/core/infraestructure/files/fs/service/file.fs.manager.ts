import { Injectable } from '@nestjs/common'
import { rmSync } from 'node:fs'
import { FileManager } from 'src/core/application/file/file.manager'
import { DeleteFileOptions } from 'src/core/application/file/types/delete.options'

@Injectable()
export class FileFsManager implements FileManager {
    async delete(options: DeleteFileOptions): Promise<void> {
        rmSync(options.path)
    }
}
