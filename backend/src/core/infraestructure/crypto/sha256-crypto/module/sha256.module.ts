import { Module } from '@nestjs/common'
import { Sha256Service } from '../service/sha256.crypto'

@Module({
    providers: [Sha256Service],
    exports: [Sha256Service],
})
export class Sha256Module {}
