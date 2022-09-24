import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { TokenProvider } from 'src/core/application/token/token.provider'

@Injectable()
export class JwtProviderService implements TokenProvider {
    constructor(private jwtService: JwtService) {}
    sign<T extends object>(value: T): string {
        return this.jwtService.sign(value)
    }

    verify<T extends object>(value: string): T {
        return this.jwtService.verify<T>(value)
    }
}
