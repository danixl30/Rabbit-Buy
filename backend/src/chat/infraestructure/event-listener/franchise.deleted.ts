import { Injectable } from '@nestjs/common'
import { DeleteChatsByFranchiseApplicationService } from 'src/chat/application/services/delete-by-franchise/delete.chats.franchise.application.service'
import { ExceptionDecorator } from 'src/core/application/decorators/exception.decorator'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { ConcreteExceptionReductor } from 'src/core/infraestructure/exception/exception.reductor'
import { FranchiseDeletedEvent } from 'src/franchise/domain/events/franchise.deleted'
import { ChatMongoRepository } from '../repositories/chat.mongo.repository'

@Injectable()
export class FranchiseDeletedEventListener {
    constructor(
        private chatRepository: ChatMongoRepository,
        private eventHnadler: EventHandlerNative,
    ) {
        this.execute()
    }

    execute() {
        this.eventHnadler.subscribe(
            FranchiseDeletedEvent.eventName,
            async (event: FranchiseDeletedEvent) => {
                await new ExceptionDecorator(
                    new DeleteChatsByFranchiseApplicationService(
                        this.chatRepository,
                        this.eventHnadler,
                    ),
                    new ConcreteExceptionReductor(),
                ).execute({ franchise: event.id.value })
            },
        )
    }
}
