import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CategoryRepository } from 'src/category/application/repositories/category.repository'
import { Category } from 'src/category/domain/category'
import { CategoryId } from 'src/category/domain/value-objects/category.id'
import { Criteria } from 'src/core/application/repository/query/criteria'
import {
    Category as CategoryDB,
    CategoryDocument,
} from '../models/category.model'
import { from as MongoUUID } from 'uuid-mongodb'
import { Injectable } from '@nestjs/common'
import { CriteriaMongoTransformer } from 'src/core/infraestructure/criteria-transformer/mongo/crietia.mongo.transformer'
import { categoryDbToDomain } from '../mappers/category.db.domain'

@Injectable()
export class CategoryMongoRepository implements CategoryRepository {
    constructor(
        @InjectModel(CategoryDB.name)
        private categorySchema: Model<CategoryDocument>,
        private criteriaTransformer: CriteriaMongoTransformer,
    ) {}
    async save(aggregate: Category): Promise<Category> {
        const category = await this.categorySchema.findById(
            MongoUUID(aggregate.id.value),
        )
        if (!category) {
            const categoryToSave = new this.categorySchema()
            categoryToSave.id = MongoUUID(aggregate.id.value)
            categoryToSave.name = aggregate.name.value
            categoryToSave.parent = aggregate.parent?.value.value || ''
            categoryToSave.childs = aggregate.subCategories.map((e) => e.value)
            await categoryToSave.save()
            return aggregate
        }
        category.name = aggregate.name.value
        category.parent = aggregate.parent?.value.value
        category.childs = aggregate.subCategories.map((e) => e.value)
        await category.save()
        return aggregate
    }

    async delete(aggregate: Category): Promise<Category> {
        await this.categorySchema.findByIdAndDelete(
            MongoUUID(aggregate.id.value),
        )
        return aggregate
    }

    async searchById(id: CategoryId): Promise<Category> {
        const category = await this.categorySchema.findById(MongoUUID(id.value))
        return category ? categoryDbToDomain(category) : null
    }

    async searchAll(criteria: Criteria): Promise<Category[]> {
        const criteriaMongo = this.criteriaTransformer.transform(criteria)
        const categories = await this.categorySchema
            .find(criteriaMongo.filter)
            .sort(criteriaMongo.sort)
            .skip(criteriaMongo.skip)
            .limit(criteriaMongo.limit)
        return categories.map(categoryDbToDomain)
    }

    async searchOne(criteria: Criteria): Promise<Category> {
        const criteriaMongo = this.criteriaTransformer.transform(criteria)
        const category = await this.categorySchema.findOne(criteriaMongo.filter)
        return category ? categoryDbToDomain(category) : null
    }
}
