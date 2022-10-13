import { CategoryId } from 'src/category/domain/value-objects/category.id'
import { ApplicationService } from 'src/core/application/service/application.service'
import { CategoryNotFoundException } from '../../exceptions/category.not.found'
import { categoryDomainToPrimitive } from '../../mappers/category.domain.primitive'
import { CategoryRepository } from '../../repositories/category.repository'
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
        const parent = await this.categoryRepository.searchById(
            new CategoryId(data.parent),
        )
        if (!parent) throw new CategoryNotFoundException()
        const subCategories = await parent.subCategories.asyncMap(
            this.categoryRepository.searchById,
        )
        return {
            categories: subCategories.map(categoryDomainToPrimitive),
        }
    }
}
