import { ChatFranchise } from 'src/chat/domain/value-objects/chat.franchise'
import { ApplicationService } from 'src/core/application/service/application.service'
import { FranchiseId } from 'src/franchise/domain/value-objects/franchise.id'
import { GetProviderApplicationService } from 'src/provider/application/services/get-provider/get.provider.application.service'
import { FindUserApplicationService } from 'src/user/application/services/find-user/find.user.application.service'
import { ChatRepository } from '../../repository/chat.repository'
import { FindChatByFranchiseQueryFactory } from './queries/get.chats.franchise.query'
import { GetChatsByClientDTO } from './types/dto'
import { GetChatsByProviderResponse } from './types/response'

export class GetChatsByProviderApplicationService
    implements
        ApplicationService<GetChatsByClientDTO, GetChatsByProviderResponse[]>
{
    constructor(
        private getProviderService: GetProviderApplicationService,
        private getClient: FindUserApplicationService,
        private chatRepository: ChatRepository,
    ) {}

    async execute(
        data: GetChatsByClientDTO,
    ): Promise<GetChatsByProviderResponse[]> {
        const provider = await this.getProviderService.execute({ id: data.id })
        const chats = await this.chatRepository.searchAll(
            new FindChatByFranchiseQueryFactory(
                new ChatFranchise(new FranchiseId(provider.franchise)),
            ).create(),
        )
        return chats.asyncMap(async (chat) => {
            const client = await this.getClient.execute({
                id: chat.client.value.value,
            })
            return {
                id: chat.id.value,
                clientId: client.id,
                email: client.email,
                username: client.username,
            }
        })
    }
}
