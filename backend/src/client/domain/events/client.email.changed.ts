import {DomainEvent} from "src/core/domain/events/event";
import {ClientEmail} from "../value-objects/client.email";
import {ClientId} from "../value-objects/client.id";

export class ClientEmailChangedEvent extends DomainEvent {
    constructor(
        private _id: ClientId,
        private _email: ClientEmail
    ) {
        super()
    }

    get id() {
        return this._id
    }

    get email() {
        return this._email
    }
}
