import { SetMetadata } from '@nestjs/common'
import { Roles as RolesData } from 'src/user/domain/value-objects/roles'

export const Roles = (...roles: RolesData[]) => SetMetadata('roles', roles)
