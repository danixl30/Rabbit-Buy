import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { Operator } from './operator'

export class FilterOperator implements ValueObject<FilterOperator> {
    constructor(private operator: Operator) {
        if (!Operator[operator]) throw new Error('Operator not suported')
    }

    get value() {
        return this.operator
    }

    equals(other: FilterOperator) {
        return true
    }
}
