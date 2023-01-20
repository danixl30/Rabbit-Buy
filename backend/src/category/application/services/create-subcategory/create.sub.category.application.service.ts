import { Category } from 'src/category/domain/category'
import { CategoryId } from 'src/category/domain/value-objects/category.id'
import { CategoryName } from 'src/category/domain/value-objects/category.name'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { ApplicationService } from 'src/core/application/service/application.service'
import { UUIDGenerator } from 'src/core/application/UUID/UUID.generator'
import { CategoryNotFoundException } from '../../exceptions/category.not.found'
import { CategoryRepository } from '../../repositories/category.repository'
import { CreateSubCategoryDTO } from './types/dto'
import { CreateSubCategoryResponse } from './types/response'

export class CreateSubCategoryApplicationService
    implements
        ApplicationService<CreateSubCategoryDTO, CreateSubCategoryResponse>
{
    constructor(
        private categoryRepository: CategoryRepository,
        private uuidGenerator: UUIDGenerator,
        private eventHandler: EventHandler,
    ) {}

    async execute(
        data: CreateSubCategoryDTO,
    ): Promise<CreateSubCategoryResponse> {
        const parent = await this.categoryRepository.searchById(
            CategoryId.create(data.parent),
        )
        if (!parent) throw new CategoryNotFoundException()
        const category = Category.create(
            CategoryId.create(this.uuidGenerator.generate()),
            CategoryName.create(data.name),
        )
        await this.categoryRepository.save(category)
        parent.addSubCategory(category.id)
        await this.categoryRepository.save(parent)
        this.eventHandler.publish(category.pullEvents())
        this.eventHandler.publish(parent.pullEvents())
        return {
            id: category.id.value,
        }
    }
}
