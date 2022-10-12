import { AgreggateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { ProductBoughtEvent } from './events/product.bought'
import { ProductCategoryAddedEvent } from './events/product.category.added'
import { ProductCategoryRemovedEvent } from './events/product.category.removed'
import { ProductCreatedEvent } from './events/product.created'
import { ProductCurrencyChangedEvent } from './events/product.currency.changed'
import { ProductDeletedEvent } from './events/product.deleted'
import { ProductDescriptionEvent } from './events/product.description.changed'
import { ProductExistenceChangedEvent } from './events/product.existence.changed'
import { ProductImageChangedEvent } from './events/product.image.changed'
import { ProductNameChangedEvent } from './events/product.name.changed'
import { ProductPriceChangedEvent } from './events/product.price.changed'
import { InvalidProductException } from './exceptions/invalid.product'
import { NotExistenceException } from './exceptions/not.existence'
import { CategoryRef } from './value-objects/category.ref'
import { FranchiseRef } from './value-objects/franchise.ref'
import { ProductImage } from './value-objects/image'
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
        private _franchise: FranchiseRef,
        private _image: ProductImage,
        private _categories: CategoryRef[] = [],
    ) {
        super(id)
        this.apply(
            new ProductCreatedEvent(
                id,
                this.name,
                this.description,
                this.existence,
                this.price,
                this.currency,
                this.franchise,
                this.image,
                this.categories,
            ),
        )
    }

    get name() {
        return this._name
    }

    get description() {
        return this._description
    }

    get image() {
        return this._image
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

    get categories() {
        return [...this._categories]
    }

    get franchise() {
        return this._franchise
    }

    changeName(name: ProductName) {
        this._name = name
        this.apply(new ProductNameChangedEvent(this.id, name))
    }

    changeDescription(description: ProductDescription) {
        this._description = description
        this.apply(new ProductDescriptionEvent(this.id, description))
    }

    changePrice(price: ProductPrice) {
        this._price = price
        this.apply(new ProductPriceChangedEvent(this.id, price))
    }

    changeCurrency(currency: ProductCurrency) {
        this._currency = currency
        this.apply(new ProductCurrencyChangedEvent(this.id, currency))
    }

    addCategory(category: CategoryRef) {
        this._categories.push(category)
        this.apply(new ProductCategoryAddedEvent(this.id, category))
    }

    removeCategory(category: CategoryRef) {
        this._categories.filter((e) => !e.equals(category))
        this.apply(new ProductCategoryRemovedEvent(this.id, category))
    }

    changeImage(image: ProductImage) {
        this._image = image
        this.apply(new ProductImageChangedEvent(this.id, image))
    }

    buy(quantity: ProductExistence) {
        if (quantity.value > this._existence.value)
            throw new NotExistenceException()
        this._existence = new ProductExistence(
            this._existence.value - quantity.value,
        )
        this.apply(new ProductBoughtEvent(this.id, quantity))
    }

    changeExistence(existence: ProductExistence) {
        this._existence = existence
        this.apply(new ProductExistenceChangedEvent(this.id, existence))
    }

    delete() {
        this.apply(new ProductDeletedEvent(this.id))
    }

    validateState(): void {
        if (
            !this.id ||
            !this.name ||
            !this.description ||
            !this.existence ||
            !this.price ||
            !this.currency ||
            !this.franchise ||
            !this.image
        )
            throw new InvalidProductException()
    }
}
