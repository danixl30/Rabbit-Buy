import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID/UUID.reg.exp'
import { InvalidGroupIdException } from '../exceptions/invalid.group.id'

export class FranchiseGroupId implements ValueObject<FranchiseGroupId> {
    private constructor(private groupId: string) {
        if (!regExpUUID.test(this.groupId)) throw new InvalidGroupIdException()
    }

    get value(): string {
        return this.groupId
    }

    equals(other: FranchiseGroupId): boolean {
        return other.value === this.value
    }

    static create(groupId: string) {
        return new FranchiseGroupId(groupId)
    }
}
