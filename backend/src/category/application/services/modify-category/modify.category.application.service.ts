import { CategoryId } from 'src/category/domain/value-objects/category.id'
import { CategoryName } from 'src/category/domain/value-objects/category.name'
import { ApplicationService } from 'src/core/application/service/application.service'
import { CategoryNotFoundException } from '../../exceptions/category.not.found'
import { CategoryRepository } from '../../repositories/category.repository'
import { ModifyCategoryDTO } from './types/modify.category.dto'
import { ModifyCategoryResponse } from './types/modify.category.response'

export class ModifyCategoryApplicationService
    implements ApplicationService<ModifyCategoryDTO, ModifyCategoryResponse>
{
    constructor(private categoryRepository: CategoryRepository) {}
    async execute(data: ModifyCategoryDTO): Promise<ModifyCategoryResponse> {
        const category = await this.categoryRepository.searchById(
            new CategoryId(data.id),
        )
        if (!category) throw new CategoryNotFoundException()
        category.changeName(new CategoryName(data.name))
        await this.categoryRepository.save(category)
        return {
            name: category.name.value,
            id: category.id.value,
        }
    }
}
