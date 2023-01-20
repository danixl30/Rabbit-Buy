import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { InvalidProviderIdException } from 'src/provider/domain/exceptions/invalid.provider.id'
import { regExpUUID } from 'src/utils/reg-exps/UUID/UUID.reg.exp'

export class ProductId implements ValueObject<ProductId> {
    private constructor(private id: string) {
        if (!regExpUUID.test(id)) throw new InvalidProviderIdException()
    }

    get value(): string {
        return this.id
    }

    equals(other: ProductId): boolean {
        return other.value === this.value
    }

    static create(id: string) {
        return new ProductId(id)
    }
}
