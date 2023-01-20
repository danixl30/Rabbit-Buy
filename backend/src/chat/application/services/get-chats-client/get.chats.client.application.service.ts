import { ChatClient } from 'src/chat/domain/value-objects/chat.client'
import { ApplicationService } from 'src/core/application/service/application.service'
import { GetFranchiseDetailApplicationService } from 'src/franchise/application/services/get-franchise-detail/get.franchise.detail.application.service'
import { UserId } from 'src/user/domain/value-objects/user.id'
import { ChatRepository } from '../../repository/chat.repository'
import { FindChatByClientQueryFactory } from './queries/get.chats.client.query'
import { GetChatsByClientDTO } from './types/dto'
import { GetChatsByClientResponse } from './types/response'

export class GetChatsByClientApplicationService
    implements
        ApplicationService<GetChatsByClientDTO, GetChatsByClientResponse[]>
{
    constructor(
        private getFranchiseService: GetFranchiseDetailApplicationService,
        private chatRepository: ChatRepository,
    ) {}

    async execute(
        data: GetChatsByClientDTO,
    ): Promise<GetChatsByClientResponse[]> {
        const chats = await this.chatRepository.searchAll(
            new FindChatByClientQueryFactory(
                ChatClient.create(UserId.create(data.id)),
            ).create(),
        )
        return chats.asyncMap(async (chat) => {
            const franchise = await this.getFranchiseService.execute({
                id: chat.franchise.value.value,
            })
            return {
                id: chat.id.value,
                franchiseName: franchise.name,
                franchiseId: franchise.id,
                image: franchise.image,
            }
        })
    }
}
