import { Category } from 'src/category/domain/category'
import { CategoryId } from 'src/category/domain/value-objects/category.id'
import { CategoryName } from 'src/category/domain/value-objects/category.name'
import { ApplicationService } from 'src/core/application/service/application.service'
import { UUIDGenerator } from 'src/core/application/UUID/UUID.generator'
import { CategoryRepository } from '../../repositories/category.repository'
import { CreateCategoryResponse } from './types/create.category.response'
import { CreateCategoryDTO } from './types/create.category.service.dto'

export class CreateCategoryApplicationService
    implements ApplicationService<CreateCategoryDTO, CreateCategoryResponse>
{
    constructor(
        private categoryRepository: CategoryRepository,
        private uuidGenerator: UUIDGenerator,
    ) {}
    async execute(data: CreateCategoryDTO): Promise<CreateCategoryResponse> {
        const category = new Category(
            new CategoryId(this.uuidGenerator.generate()),
            new CategoryName(data.name),
        )
        await this.categoryRepository.save(category)
        return {
            name: category.name.value,
            id: category.id.value,
        }
    }
}
