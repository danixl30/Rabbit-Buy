import { Model } from 'mongoose'
import { Product as ProductDb } from '../models/product.model'
import { ProductRepository } from 'src/product/application/repositories/product.repository'
import { ProductDocument } from '../models/product.model'
import { InjectModel } from '@nestjs/mongoose'
import { Product } from 'src/product/domain/product'
import { ProductId } from 'src/product/domain/value-objects/product.id'
import { FilterByCriteriaDTO } from 'src/product/application/types/filter.criteria'
import { ProductPage } from 'src/product/domain/value-objects/product.page'
import { CategoryRef } from 'src/product/domain/value-objects/category.ref'
import { productDbToDomain } from '../mappers/product.db.domain'

export class ProductMongoRepository implements ProductRepository {
    constructor(
        @InjectModel(ProductDb.name)
        private productModel: Model<ProductDocument>,
    ) {}

    async save(aggregate: Product): Promise<Product> {
        const product = await this.productModel.findById(aggregate.id.value)
        if (!product) {
            const productToSave = new this.productModel()
            productToSave._id = aggregate.id.value
            productToSave.productName = aggregate.name.value
            productToSave.description = aggregate.description.value
            productToSave.price = aggregate.price.value
            productToSave.existence = aggregate.existence.value
            productToSave.currency = aggregate.currency.value
            productToSave.image = aggregate.image.value
            productToSave.franchise = aggregate.franchise.value.value
            productToSave.categories = aggregate.categories.map(
                (e) => e.value.value,
            )
            await productToSave.save()
            return aggregate
        }
        product.productName = aggregate.name.value
        product.description = aggregate.description.value
        product.price = aggregate.price.value
        product.existence = aggregate.existence.value
        product.currency = aggregate.currency.value
        product.image = aggregate.image.value
        product.franchise = aggregate.franchise.value.value
        product.categories = aggregate.categories.map((e) => e.value.value)
        await product.save()
        return aggregate
    }

    async delete(aggregate: Product): Promise<Product> {
        await this.productModel.findByIdAndDelete(aggregate.id.value)
        return aggregate
    }

    async searchById(id: ProductId): Promise<Product> {
        const product = await this.productModel.findById(id.value)
        return product ? productDbToDomain(product) : null
    }

    async searchByCriteria(
        criteria: FilterByCriteriaDTO,
        page?: ProductPage,
    ): Promise<Product[]> {
        if (!page) {
            const products = await this.productModel
                .find({
                    $or: [
                        {
                            name: {
                                $regex: criteria.text,
                                $options: 'i',
                            },
                        },
                        {
                            description: {
                                $regex: criteria.text,
                                $options: 'i',
                            },
                        },
                    ],
                })
                .sort({ dateAdded: -1 })
            return products.map(productDbToDomain)
        }
        const products = await this.productModel
            .find({
                $or: [
                    {
                        productName: new RegExp(criteria.text, 'i'),
                    },
                    {
                        description: new RegExp(criteria.text, 'i'),
                    },
                ],
            })
            .sort({ dateAdded: -1 })
            .skip((page.value - 1) * 10)
            .limit(10)
        return products.map(productDbToDomain)
    }

    async list(page?: ProductPage): Promise<Product[]> {
        if (!page) {
            const products = await this.productModel
                .find()
                .sort({ dateAdded: -1 })
            return products.map(productDbToDomain)
        }
        const products = await this.productModel
            .find()
            .sort({ dateAdded: -1 })
            .skip((page.value - 1) * 10)
            .limit(10)
        return products.map(productDbToDomain)
    }

    async listByCategory(
        category: CategoryRef,
        page?: ProductPage,
    ): Promise<Product[]> {
        if (page) {
            const products = await this.productModel
                .find({ catecory: category.value.value })
                .sort({ dateAdded: -1 })
            return products.map(productDbToDomain)
        }
        const products = await this.productModel
            .find({ catecory: category.value.value })
            .sort({ dateAdded: -1 })
            .limit(10)
            .skip(page.value)
        return products.map(productDbToDomain)
    }
}
