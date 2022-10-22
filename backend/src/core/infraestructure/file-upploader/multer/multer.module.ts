import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'

@Module({
    imports: [
        MulterModule.register({
            dest: '../../../../../public/uploads',
        }),
    ],
})
export class MulterConfigModule {}
