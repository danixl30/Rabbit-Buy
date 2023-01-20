import { Category } from 'src/category/domain/category'
import { CategoryId } from 'src/category/domain/value-objects/category.id'
import { CategoryName } from 'src/category/domain/value-objects/category.name'
import { CategoryParent } from 'src/category/domain/value-objects/category.parent'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { ApplicationService } from 'src/core/application/service/application.service'
import { UUIDGenerator } from 'src/core/application/UUID/UUID.generator'
import { CategoryNotFoundException } from '../../exceptions/category.not.found'
import { CategoryRepository } from '../../repositories/category.repository'
import { CreateCategoryResponse } from './types/create.category.response'
import { CreateCategoryDTO } from './types/create.category.service.dto'

export class CreateCategoryApplicationService
    implements ApplicationService<CreateCategoryDTO, CreateCategoryResponse>
{
    constructor(
        private categoryRepository: CategoryRepository,
        private uuidGenerator: UUIDGenerator,
        private eventHandler: EventHandler,
    ) {}
    async execute(data: CreateCategoryDTO): Promise<CreateCategoryResponse> {
        if (data.parent) {
            const parent = await this.categoryRepository.searchById(
                CategoryId.create(data.parent),
            )
            if (!parent) throw new CategoryNotFoundException()
            const category = Category.create(
                CategoryId.create(this.uuidGenerator.generate()),
                CategoryName.create(data.name),
                [],
                CategoryParent.create(CategoryId.create(data.parent!!)),
            )
            parent.addSubCategory(category.id)
            await this.categoryRepository.save(category)
            await this.categoryRepository.save(parent)
            this.eventHandler.publish(category.pullEvents())
            this.eventHandler.publish(parent.pullEvents())
            return {
                name: category.name.value,
                id: category.id.value,
                parent: data.parent,
            }
        }
        const category = Category.create(
            CategoryId.create(this.uuidGenerator.generate()),
            CategoryName.create(data.name),
        )
        await this.categoryRepository.save(category)
        this.eventHandler.publish(category.pullEvents())
        return {
            name: category.name.value,
            id: category.id.value,
        }
    }
}
