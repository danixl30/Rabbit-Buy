import {ValueObject} from "src/core/domain/value-objects/value.object";
import {regExpUUID} from "src/utils/reg-exps/UUID/UUID.reg.exp";
import {InvalidAdminIdException} from "../exceptions/invalid.admin.id";

export class AdminId implements ValueObject<AdminId> {
    constructor(private id: string) {
        if (!regExpUUID.test(id)) throw new InvalidAdminIdException()
    }

    get value() {
        return this.id
    }

    equals(other: AdminId): boolean {
        return other.value === this.value
    }
}
