import {
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
    Injectable,
} from '@nestjs/common'
import { JwtProviderService } from 'src/core/infraestructure/token/jwt/service/jwt.provider.service'
import { UserLogged } from 'src/user/application/services/login/types/user.logged'
import { UserId } from 'src/user/domain/value-objects/user.id'
import { UserMongoRepository } from '../../repositories/user.mongo.repository'

@Injectable()
export class UserGuard implements CanActivate {
    constructor(
        private userRepository: UserMongoRepository,
        private tokenManager: JwtProviderService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const token = request.headers.auth
        if (!token) throw new UnauthorizedException()
        try {
            const id = this.tokenManager.verify<UserLogged>(token)
            const user = await this.userRepository.getById(UserId.create(id.id))
            if (!user) throw new Error('User not found')
            request.user = user
        } catch (e) {
            console.log(e.message)
            throw new UnauthorizedException()
        }
        return true
    }
}
