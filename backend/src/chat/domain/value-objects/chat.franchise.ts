import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { FranchiseId } from 'src/franchise/domain/value-objects/franchise.id'

export class ChatFranchise implements ValueObject<ChatFranchise> {
    private constructor(private id: FranchiseId) {}

    get value() {
        return this.id
    }

    equals(other: ChatFranchise): boolean {
        return other.value.equals(this.value)
    }

    static create(id: FranchiseId) {
        return new ChatFranchise(id)
    }
}
