import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { UserId } from 'src/user/domain/value-objects/user.id'

export class UserRef implements ValueObject<UserRef> {
    private constructor(private userId: UserId) {}

    get value() {
        return this.userId
    }

    equals(other: UserRef): boolean {
        return other.value.equals(this.value)
    }

    static create(userId: UserId) {
        return new UserRef(userId)
    }
}
