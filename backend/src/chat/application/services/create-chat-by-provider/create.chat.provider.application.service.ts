import { Chat } from 'src/chat/domain/chat'
import { ChatClient } from 'src/chat/domain/value-objects/chat.client'
import { ChatFranchise } from 'src/chat/domain/value-objects/chat.franchise'
import { ChatId } from 'src/chat/domain/value-objects/chat.id'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { ApplicationService } from 'src/core/application/service/application.service'
import { UUIDGenerator } from 'src/core/application/UUID/UUID.generator'
import { FranchiseId } from 'src/franchise/domain/value-objects/franchise.id'
import { GetProviderApplicationService } from 'src/provider/application/services/get-provider/get.provider.application.service'
import { FindUserApplicationService } from 'src/user/application/services/find-user/find.user.application.service'
import { UserId } from 'src/user/domain/value-objects/user.id'
import { ChatRepository } from '../../repository/chat.repository'
import { CreateChatByProviderDTO } from './types/dto'
import { CreateChatByProviderResponse } from './types/response'

export class CreateChatByProviderApplicationService
    implements
        ApplicationService<
            CreateChatByProviderDTO,
            CreateChatByProviderResponse
        >
{
    constructor(
        private getProviderService: GetProviderApplicationService,
        private getClient: FindUserApplicationService,
        private chatRepository: ChatRepository,
        private uuidGenerator: UUIDGenerator,
        private eventHandler: EventHandler,
    ) {}

    async execute(
        data: CreateChatByProviderDTO,
    ): Promise<CreateChatByProviderResponse> {
        await this.getClient.execute({ id: data.client })
        const provider = await this.getProviderService.execute({
            id: data.provider,
        })
        const chat = new Chat(
            new ChatId(this.uuidGenerator.generate()),
            new ChatClient(new UserId(data.client)),
            new ChatFranchise(new FranchiseId(provider.franchise)),
        )
        await this.chatRepository.save(chat)
        this.eventHandler.publish(chat.pullEvents())
        return {
            id: chat.id.value,
        }
    }
}
