import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
} from '@nestjs/websockets'
import { CreateMessageApplicationService } from 'src/chat/application/services/create-message/create.message.application.service'
import { GetMessagesResponse } from 'src/chat/application/services/get-messages/types/response'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { ConcreteUUIDGenerator } from 'src/core/infraestructure/UUID/service/concrete.UUID.generator'
import { Disconnect } from 'src/core/infraestructure/web-sockets/decorators/disconnect.decorator'
import { EmitEvent } from 'src/core/infraestructure/web-sockets/decorators/emit.event.decorator'
import { SocketId } from 'src/core/infraestructure/web-sockets/decorators/get.id.decorator'
import { DisconnectHandler } from 'src/core/infraestructure/web-sockets/decorators/types/disconnect.type'
import { EmitEventHandler } from 'src/core/infraestructure/web-sockets/decorators/types/EmitEventHadler'
import { objectValues } from 'src/utils/object-methods/object.methods'
import { ChatMongoRepository } from '../repositories/chat.mongo.repository'
import { MessageMongoRepository } from '../repositories/message.mongo.repository'
import { MessageDTO } from './dto/message.dto'
import { SubscribeUnsubscribeChatDTO } from './dto/subscribe.unsubscribe.dto'
import { TypingDTO } from './dto/typing.dto'
import { SubscriptorsRecord } from './types/subscriptors.record'

@WebSocketGateway(80)
export class ChatGateway {
    private subscriptors: SubscriptorsRecord = {}

    constructor(
        private chatRepository: ChatMongoRepository,
        private messageRepository: MessageMongoRepository,
        private uuidGenerator: ConcreteUUIDGenerator,
        private eventHandler: EventHandlerNative,
    ) {}

    @SubscribeMessage('subscribe')
    subscribe(
        @SocketId() id: string,
        @MessageBody() data: SubscribeUnsubscribeChatDTO,
    ) {
        if (!this.subscriptors[data.chat]) this.subscriptors[data.chat] = {}
        this.subscriptors[data.chat][data.userId] = id
    }

    @SubscribeMessage('unsubscribe')
    unsubscribe(
        @Disconnect() discconect: DisconnectHandler,
        @MessageBody() data: SubscribeUnsubscribeChatDTO,
    ) {
        delete this.subscriptors[data.chat]?.[data.userId]
        discconect()
    }

    @SubscribeMessage('typing')
    typing(
        @EmitEvent() emiter: EmitEventHandler<{ name: string }>,
        @MessageBody() data: TypingDTO,
    ) {
        const ids = objectValues(this.subscriptors[data.chat])
        emiter(
            {
                name: data.name,
            },
            'typing',
            ...ids,
        )
    }

    @SubscribeMessage('message')
    sendMessage(
        @EmitEvent() emiter: EmitEventHandler<GetMessagesResponse>,
        @MessageBody() data: MessageDTO,
    ) {
        const ids = objectValues(this.subscriptors[data.chat])
        emiter(
            {
                id: this.uuidGenerator.generate(),
                from: data.from,
                body: data.body,
                timestamp: new Date(),
            },
            'message',
            ...ids,
        )
        new CreateMessageApplicationService(
            this.chatRepository,
            this.messageRepository,
            this.uuidGenerator,
            this.eventHandler,
        ).execute(data)
    }
}
