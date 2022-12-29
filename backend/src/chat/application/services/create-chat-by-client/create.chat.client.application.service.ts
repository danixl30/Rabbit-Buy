import { Chat } from 'src/chat/domain/chat'
import { ChatClient } from 'src/chat/domain/value-objects/chat.client'
import { ChatFranchise } from 'src/chat/domain/value-objects/chat.franchise'
import { ChatId } from 'src/chat/domain/value-objects/chat.id'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { ApplicationService } from 'src/core/application/service/application.service'
import { UUIDGenerator } from 'src/core/application/UUID/UUID.generator'
import { GetFranchiseDetailApplicationService } from 'src/franchise/application/services/get-franchise-detail/get.franchise.detail.application.service'
import { FranchiseId } from 'src/franchise/domain/value-objects/franchise.id'
import { UserId } from 'src/user/domain/value-objects/user.id'
import { ChatRepository } from '../../repository/chat.repository'
import { CreateChatByClientDTO } from './types/dto'
import { CreateChatByClientResponse } from './types/response'

export class CreateChatByClientApplicationService
    implements
        ApplicationService<CreateChatByClientDTO, CreateChatByClientResponse>
{
    constructor(
        private getFranchiseService: GetFranchiseDetailApplicationService,
        private chatRepository: ChatRepository,
        private uuidGenerator: UUIDGenerator,
        private eventHandler: EventHandler,
    ) {}

    async execute(
        data: CreateChatByClientDTO,
    ): Promise<CreateChatByClientResponse> {
        const franchise = await this.getFranchiseService.execute({
            id: data.franchise,
        })
        const chat = new Chat(
            new ChatId(this.uuidGenerator.generate()),
            new ChatClient(new UserId(data.client)),
            new ChatFranchise(new FranchiseId(franchise.id)),
        )
        await this.chatRepository.save(chat)
        this.eventHandler.publish(chat.pullEvents())
        return {
            id: chat.id.value,
        }
    }
}
