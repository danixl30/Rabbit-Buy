import { Module } from '@nestjs/common'
import { Sha256Module } from './sha256-crypto/module/sha256.module'

@Module({
    imports: [Sha256Module],
    exports: [Sha256Module],
})
export class CryptoModule {}
