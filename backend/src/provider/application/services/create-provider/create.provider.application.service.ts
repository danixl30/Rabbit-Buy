import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { ApplicationService } from 'src/core/application/service/application.service'
import { FranchiseNotFoundException } from 'src/franchise/application/exceptions/franchise.not.found'
import { FranchiseRepository } from 'src/franchise/application/repositories/franchise.repository'
import { FranchiseGroupId } from 'src/franchise/domain/value-objects/franchise.group.id'
import { Provider } from 'src/provider/domain/provider'
import { FranchiseRef } from 'src/provider/domain/value-objects/franchise.ref'
import { ProviderId } from 'src/provider/domain/value-objects/provider.id'
import { RegisterUserApplicationService } from 'src/user/application/services/register-user/register.user.application.service'
import { Roles } from 'src/user/domain/value-objects/roles'
import { ProviderRepository } from '../../repositories/provider.repository'
import { CreateProviderDTO } from './types/create.provider.dto'
import { CreateProviderResponse } from './types/create.provider.response'

export class CreateProviderApplicationService
    implements ApplicationService<CreateProviderDTO, CreateProviderResponse>
{
    constructor(
        private createUserService: RegisterUserApplicationService,
        private providerRepository: ProviderRepository,
        private franchiseRepository: FranchiseRepository,
        private eventHandler: EventHandler,
    ) {}

    async execute(data: CreateProviderDTO): Promise<CreateProviderResponse> {
        const franchise = await this.franchiseRepository.searchByGroudId(
            new FranchiseGroupId(data.groudId),
        )
        if (!franchise) throw new FranchiseNotFoundException()
        data.role = Roles.PROVIDER
        const res = await this.createUserService.execute(data)
        const provider = new Provider(
            new ProviderId(res.id),
            new FranchiseRef(franchise.id),
        )
        await this.providerRepository.save(provider)
        this.eventHandler.publish(franchise.pullEvents())
        return {
            id: provider.id.value,
        }
    }
}
