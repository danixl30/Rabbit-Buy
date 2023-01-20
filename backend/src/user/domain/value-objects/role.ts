import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { InvalidRoleException } from '../exceptions/invalid.role'
import { Roles } from './roles'

export class Role implements ValueObject<Role> {
    private constructor(private role: Roles) {
        if (!Roles[role]) throw new InvalidRoleException()
    }

    get value(): Roles {
        return this.role
    }

    match(role: Role): boolean {
        return role.value === this.value
    }

    equals(other: Role): boolean {
        return other.value === this.role
    }

    static create(role: Roles) {
        return new Role(role)
    }
}
