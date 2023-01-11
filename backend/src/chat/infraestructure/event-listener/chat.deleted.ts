import { Injectable } from '@nestjs/common'
import { DeleteChatsByFranchiseApplicationService } from 'src/chat/application/services/delete-by-franchise/delete.chats.franchise.application.service'
import { DeleteMessagesByChatApplicationService } from 'src/chat/application/services/delete-messages-chat/delete.messages.chat.application.service'
import { ChatDeletedEvent } from 'src/chat/domain/events/chat.deleted'
import { ExceptionDecorator } from 'src/core/application/decorators/exception.decorator'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { ConcreteExceptionReductor } from 'src/core/infraestructure/exception/exception.reductor'
import { MessageMongoRepository } from '../repositories/message.mongo.repository'

@Injectable()
export class ChatDeletedEventListener {
    constructor(
        private messageRepository: MessageMongoRepository,
        private eventHnadler: EventHandlerNative,
    ) {
        this.execute()
    }

    execute() {
        this.eventHnadler.subscribe(
            ChatDeletedEvent.eventName,
            async (event: ChatDeletedEvent) => {
                await new ExceptionDecorator(
                    new DeleteMessagesByChatApplicationService(
                        this.messageRepository,
                        this.eventHnadler,
                    ),
                    new ConcreteExceptionReductor(),
                ).execute({ chat: event.id.value })
            },
        )
    }
}
