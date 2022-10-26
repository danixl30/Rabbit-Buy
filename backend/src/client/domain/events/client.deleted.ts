import {DomainEvent} from "src/core/domain/events/event";
import {ClientId} from "../value-objects/client.id";

export class ClientDeletedEvent extends DomainEvent {
    constructor(private _id: ClientId) {
        super()
    }

    get id() {
        return this._id
    }
}
