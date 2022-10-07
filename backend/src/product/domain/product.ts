import { AgreggateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { InvalidProductException } from './exceptions/invalid.product'
import { NotExistenceException } from './exceptions/not.existence'
import { CategoryRef } from './value-objects/category.ref'
import { FranchiseRef } from './value-objects/franchise.ref'
import { ProductCurrency } from './value-objects/product.currency'
import { ProductDescription } from './value-objects/product.description'
import { ProductExistence } from './value-objects/product.existence'
import { ProductId } from './value-objects/product.id'
import { ProductName } from './value-objects/product.name'
import { ProductPrice } from './value-objects/product.price'

export class Product extends AgreggateRoot<ProductId> {
    constructor(
        id: ProductId,
        private _name: ProductName,
        private _description: ProductDescription,
        private _existence: ProductExistence,
        private _price: ProductPrice,
        private _currency: ProductCurrency,
        private _category: CategoryRef,
        private _franchise: FranchiseRef,
    ) {
        super(id)
    }

    get name() {
        return this._name
    }

    get description() {
        return this._description
    }

    get existence() {
        return this._existence
    }

    get price() {
        return this._price
    }

    get currency() {
        return this._currency
    }

    get category() {
        return this._category
    }

    get franchise() {
        return this._franchise
    }

    changeName(name: ProductName) {
        this._name = name
    }

    changeDescription(description: ProductDescription) {
        this._description = description
    }

    changePrice(price: ProductPrice) {
        this._price = price
    }

    changeCurrency(currency: ProductCurrency) {
        this._currency = currency
    }

    changeCategory(category: CategoryRef) {
        this._category = category
    }

    buy(quantity: ProductExistence) {
        if (quantity.value > this._existence.value)
            throw new NotExistenceException()
        this._existence = new ProductExistence(
            this._existence.value - quantity.value,
        )
    }

    changeExistence(existence: ProductExistence) {
        this._existence = existence
    }

    validateState(): void {
        if (
            !this.id ||
            !this.name ||
            !this.description ||
            !this.existence ||
            !this.price ||
            !this.currency ||
            !this.category ||
            !this.franchise
        )
            throw new InvalidProductException()
    }
}
