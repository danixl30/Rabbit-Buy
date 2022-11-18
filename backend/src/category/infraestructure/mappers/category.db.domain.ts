import { Category } from 'src/category/domain/category'
import { CategoryId } from 'src/category/domain/value-objects/category.id'
import { CategoryName } from 'src/category/domain/value-objects/category.name'
import { CategoryParent } from 'src/category/domain/value-objects/category.parent'
import { CategoryDocument } from '../models/category.model'

export const categoryDbToDomain = (category: CategoryDocument) =>
    new Category(
        new CategoryId(category.id),
        new CategoryName(category.name),
        category.childs.map((e) => new CategoryId(e)),
        category.parent
            ? new CategoryParent(new CategoryId(category.id))
            : undefined,
    )
