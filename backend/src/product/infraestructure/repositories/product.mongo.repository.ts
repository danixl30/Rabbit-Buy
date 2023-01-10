import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { from as mongooseUUID } from 'uuid-mongodb'
import { Product as ProductDb } from '../models/product.model'
import { ProductRepository } from 'src/product/application/repositories/product.repository'
import { ProductDocument } from '../models/product.model'
import { InjectModel } from '@nestjs/mongoose'
import { Product } from 'src/product/domain/product'
import { ProductId } from 'src/product/domain/value-objects/product.id'
import { productDbToDomain } from '../mappers/product.db.domain'
import { CriteriaMongoTransformer } from 'src/core/infraestructure/criteria-transformer/mongo/crietia.mongo.transformer'
import { Criteria } from 'src/core/application/repository/query/criteria'

@Injectable()
export class ProductMongoRepository implements ProductRepository {
    constructor(
        @InjectModel(ProductDb.name)
        private productModel: Model<ProductDocument>,
        private criteriaTransformer: CriteriaMongoTransformer,
    ) {}

    async save(aggregate: Product): Promise<Product> {
        const product = await this.productModel.findById(
            mongooseUUID(aggregate.id.value),
        )
        if (!product) {
            const productToSave = new this.productModel()
            productToSave.id = aggregate.id.value
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
        await this.productModel.findByIdAndDelete(
            mongooseUUID(aggregate.id.value),
        )
        return aggregate
    }

    async searchById(id: ProductId): Promise<Product> {
        const product = await this.productModel.findById(mongooseUUID(id.value))
        return product ? productDbToDomain(product) : null
    }

    async searchAll(criteria: Criteria): Promise<Product[]> {
        const criteriaMongo = this.criteriaTransformer.transform(criteria)
        const products = await this.productModel
            .find(criteriaMongo.filter)
            .sort(criteriaMongo.sort)
            .skip(criteriaMongo.skip)
            .limit(criteriaMongo.limit)
        return products.map(productDbToDomain)
    }

    async searchOne(criteria: Criteria): Promise<Product> {
        const criteriaMongo = this.criteriaTransformer.transform(criteria)
        const product = await this.productModel.findOne(criteriaMongo.filter)
        return product ? productDbToDomain(product) : null
    }
}
