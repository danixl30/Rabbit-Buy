import { ApplicationService } from 'src/core/application/service/application.service'
import { categoryDomainToPrimitive } from '../../mappers/category.domain.primitive'
import { CategoryRepository } from '../../repositories/category.repository'
import { FindSubCategoriesQueryFactory } from './queries/subcategories.factory'
import { ListSubCategoriesDTO } from './types/dto'
import { ListSubCategoriesResponse } from './types/response'

export class ListSubCategoriesApplicationService
    implements
        ApplicationService<ListSubCategoriesDTO, ListSubCategoriesResponse>
{
    constructor(private categoryRepository: CategoryRepository) {}

    async execute(
        data: ListSubCategoriesDTO,
    ): Promise<ListSubCategoriesResponse> {
        const subCategories = await this.categoryRepository.searchAll(
            new FindSubCategoriesQueryFactory(data.parent).create(),
        )
        return {
            categories: subCategories.map(categoryDomainToPrimitive),
        }
    }
}
