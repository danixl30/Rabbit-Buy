import { ApplicationService } from 'src/core/application/service/application.service'
import { ProviderId } from 'src/provider/domain/value-objects/provider.id'
import { ProviderNotFoundException } from '../../exceptions/provider.not.found'
import { ProviderRepository } from '../../repositories/provider.repository'
import { GetProviderDTO } from './types/get.provider.dto'
import { GetProviderResponse } from './types/get.provider.response'

export class GetProviderApplicationService
    implements ApplicationService<GetProviderDTO, GetProviderResponse>
{
    constructor(private providerRepository: ProviderRepository) {}

    async execute(data: GetProviderDTO): Promise<GetProviderResponse> {
        const provider = await this.providerRepository.searchById(
            ProviderId.create(data.id),
        )
        if (!provider) throw new ProviderNotFoundException()
        return {
            id: provider.id.value,
            franchise: provider.franchise.value.value,
        }
    }
}
