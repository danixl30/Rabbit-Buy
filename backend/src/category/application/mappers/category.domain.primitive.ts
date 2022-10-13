import { Category } from 'src/category/domain/category'
import { CategoryPrimitive } from '../services/list-categories/types/categorie.primitive'

export const categoryDomainToPrimitive = (
    category: Category,
): CategoryPrimitive => ({
    name: category.name.value,
    id: category.id.value,
    subLevels: category.subCategories.isNotEmpty(),
})
