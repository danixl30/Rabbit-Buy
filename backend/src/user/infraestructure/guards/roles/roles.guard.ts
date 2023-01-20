import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { User } from 'src/user/domain/user'
import { Role } from 'src/user/domain/value-objects/role'
import { Roles } from 'src/user/domain/value-objects/roles'

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<Roles[]>('roles', context.getHandler())
        if (!roles || roles.isEmpty()) return true
        const request = context.switchToHttp().getRequest()
        if (!request.user) throw new UnauthorizedException()
        const user = request.user as User
        return Boolean(roles.find((e) => user.role.match(Role.create(e))))
    }
}
