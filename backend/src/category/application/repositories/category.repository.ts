import { Category } from 'src/category/domain/category'
import { CategoryId } from 'src/category/domain/value-objects/category.id'
import { Criteria } from 'src/core/application/repository/query/criteria'
import { Repository } from 'src/core/application/repository/repository'

export interface CategoryRepository extends Repository<CategoryId, Category> {
    searchById(id: CategoryId): Promise<Category>
    searchOne(criteria: Criteria): Promise<Category>
    searchAll(criteria: Criteria): Promise<Category[]>
}
