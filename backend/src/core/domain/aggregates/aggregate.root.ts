import { Entity } from '../entity/entity'
import { DomainEvent } from '../events/event'
import { ValueObject } from '../value-objects/value.object'

export abstract class AggregateRoot<
    T extends ValueObject<T>,
> extends Entity<T> {
    private events: DomainEvent[] = []

    pullEvents(): DomainEvent[] {
        const temp = this.events
        this.events = []
        return temp
    }

    protected apply(event: DomainEvent) {
        this.validateState()
        this.events.push(event)
    }

    abstract validateState(): void
}
