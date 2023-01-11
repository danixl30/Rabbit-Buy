import { Injectable } from '@nestjs/common'
import { ExceptionDecorator } from 'src/core/application/decorators/exception.decorator'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { ConcreteExceptionReductor } from 'src/core/infraestructure/exception/exception.reductor'
import { ProviderDeletedEvent } from 'src/provider/domain/events/provider.deleted'
import { DeleteUserApplicationService } from 'src/user/application/services/delete-user/delete.user.application.service'
import { UserMongoRepository } from '../repositories/user.mongo.repository'

@Injectable()
export class ProviderDeletedEventListener {
    constructor(
        private userRepository: UserMongoRepository,
        private eventHandler: EventHandlerNative,
    ) {
        this.execute()
    }

    execute() {
        this.eventHandler.subscribe(
            ProviderDeletedEvent.eventName,
            async (event: ProviderDeletedEvent) => {
                await new ExceptionDecorator(
                    new DeleteUserApplicationService(
                        this.userRepository,
                        this.eventHandler,
                    ),
                    new ConcreteExceptionReductor(),
                ).execute({ id: event.id.value })
            },
        )
    }
}
