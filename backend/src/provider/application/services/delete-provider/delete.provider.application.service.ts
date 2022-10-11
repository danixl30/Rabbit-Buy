import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { ApplicationService } from 'src/core/application/service/application.service'
import { ProviderId } from 'src/provider/domain/value-objects/provider.id'
import { ProviderNotFoundException } from '../../exceptions/provider.not.found'
import { ProviderRepository } from '../../repositories/provider.repository'
import { DeleteProviderDTO } from './types/delete.provider.dto'
import { DeleteProviderResponse } from './types/delete.provider.response'

export class DeleteProviderApplicationService
    implements ApplicationService<DeleteProviderDTO, DeleteProviderResponse>
{
    constructor(
        private providerRepository: ProviderRepository,
        private eventHandler: EventHandler,
    ) {}

    async execute(data: DeleteProviderDTO): Promise<DeleteProviderResponse> {
        const provider = await this.providerRepository.searchById(
            new ProviderId(data.id),
        )
        if (!provider) throw new ProviderNotFoundException()
        provider.delete()
        await this.providerRepository.delete(provider)
        this.eventHandler.publish(provider.pullEvents())
        return {
            id: provider.id.value,
        }
    }
}
