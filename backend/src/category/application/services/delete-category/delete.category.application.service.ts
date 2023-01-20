import { CategoryId } from 'src/category/domain/value-objects/category.id'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { ApplicationService } from 'src/core/application/service/application.service'
import { CategoryNotFoundException } from '../../exceptions/category.not.found'
import { CategoryRepository } from '../../repositories/category.repository'
import { DeleteCategoryDTO } from './types/delete.category.dto'
import { DeleteCategoryResponse } from './types/delete.category.response'

export class DeleteCategoryApplicationService
    implements ApplicationService<DeleteCategoryDTO, DeleteCategoryResponse>
{
    constructor(
        private categoryRepository: CategoryRepository,
        private eventHandler: EventHandler,
    ) {}

    async execute(data: DeleteCategoryDTO): Promise<DeleteCategoryResponse> {
        const category = await this.categoryRepository.searchById(
            CategoryId.create(data.id),
        )
        if (!category) throw new CategoryNotFoundException()
        category.delete()
        await this.categoryRepository.delete(category)
        this.eventHandler.publish(category.pullEvents())
        await category.subCategories.asyncForEach(
            async (e) => await this.execute({ id: e.value }),
        )
        return {
            name: category.name.value,
            id: category.id.value,
        }
    }
}
