import { Category } from 'src/category/domain/category'
import { CategoryId } from 'src/category/domain/value-objects/category.id'
import { CategoryName } from 'src/category/domain/value-objects/category.name'
import { CategoryParent } from 'src/category/domain/value-objects/category.parent'
import { CategoryDocument } from '../models/category.model'

export const categoryDbToDomain = (category: CategoryDocument) =>
    Category.create(
        CategoryId.create(category.id),
        CategoryName.create(category.name),
        category.childs.map((e) => CategoryId.create(e)),
        category.parent
            ? CategoryParent.create(CategoryId.create(category.id))
            : undefined,
    )
