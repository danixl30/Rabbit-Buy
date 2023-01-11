import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { ApplicationService } from 'src/core/application/service/application.service'
import { FranchiseId } from 'src/franchise/domain/value-objects/franchise.id'
import { FranchiseRef } from 'src/provider/domain/value-objects/franchise.ref'
import { ProviderRepository } from '../../repositories/provider.repository'
import { FindProvidersByFranchiseQueryFactory } from './queries/find.providers.franchise.query.factory'
import { DeleteProvidersByFranchiseDTO } from './types/dto'

export class DeleteProvidersByFranchiseApplicationService
    implements ApplicationService<DeleteProvidersByFranchiseDTO, void>
{
    constructor(
        private providerRepository: ProviderRepository,
        private eventHandler: EventHandler,
    ) {}

    async execute(data: DeleteProvidersByFranchiseDTO): Promise<void> {
        const providers = await this.providerRepository.searchAll(
            new FindProvidersByFranchiseQueryFactory(
                new FranchiseRef(new FranchiseId(data.franchise)),
            ).create(),
        )
        providers.forEach((provider) => provider.delete())
        await providers.asyncForEach(async (provider) => {
            await this.providerRepository.delete(provider)
        })
        this.eventHandler.publish(
            providers.map((provider) => provider.pullEvents()).flat(),
        )
    }
}
