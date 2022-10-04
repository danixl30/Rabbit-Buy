import { Category } from 'src/category/domain/category'
import { CategoryId } from 'src/category/domain/value-objects/category.id'
import { Repository } from 'src/core/application/repository/repository'

export interface CategoryRepository extends Repository<CategoryId, Category> {
    searchById(id: CategoryId): Promise<Category>
    list(): Promise<Category[]>
}
