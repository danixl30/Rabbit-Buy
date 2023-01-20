import { ChatFranchise } from 'src/chat/domain/value-objects/chat.franchise'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { ApplicationService } from 'src/core/application/service/application.service'
import { FranchiseId } from 'src/franchise/domain/value-objects/franchise.id'
import { ChatRepository } from '../../repository/chat.repository'
import { FindChatByFranchiseQueryFactory } from '../get-chats-provider/queries/get.chats.franchise.query'
import { DeleteChatsByFranchiseDTO } from './types/dto'

export class DeleteChatsByFranchiseApplicationService
    implements ApplicationService<DeleteChatsByFranchiseDTO, void>
{
    constructor(
        private chatRepository: ChatRepository,
        private eventHandler: EventHandler,
    ) {}

    async execute(data: DeleteChatsByFranchiseDTO): Promise<void> {
        const chats = await this.chatRepository.searchAll(
            new FindChatByFranchiseQueryFactory(
                ChatFranchise.create(FranchiseId.create(data.franchise)),
            ).create(),
        )
        chats.forEach((chat) => chat.delete())
        await chats.asyncForEach((chat) => this.chatRepository.delete(chat))
        this.eventHandler.publish(chats.map((chat) => chat.pullEvents()).flat())
    }
}
