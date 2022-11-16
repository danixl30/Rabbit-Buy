import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class Pagination implements ValueObject<Pagination> {
    constructor(private _offset: number, private _page: number) {
        if (this.page < 0 || this.offset < 0)
            throw new Error('Invalid pagination')
    }

    get page() {
        return this._page
    }

    get offset() {
        return this._offset
    }

    equals(other: Pagination): boolean {
        return other.page === this.page && other.offset === this.offset
    }
}
