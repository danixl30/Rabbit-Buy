import { Crypto } from 'src/core/application/crypto/crypto'
import { Injectable } from '@nestjs/common'
import { sha256 } from 'js-sha256'

@Injectable()
export class Sha256Service implements Crypto {
    encrypt(value: string): string {
        return sha256(value)
    }

    compare(normal: string, encrypted: string): boolean {
        return sha256(normal) === encrypted
    }
}
