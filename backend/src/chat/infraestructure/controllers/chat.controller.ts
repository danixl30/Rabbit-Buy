import {
    Controller,
    Get,
    ParseIntPipe,
    ParseUUIDPipe,
    Post,
    Query,
    UseGuards,
    Param,
    Body,
} from '@nestjs/common'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { GetMessagesApplicationService } from 'src/chat/application/services/get-messages/get.messages.application.service'
import { ExceptionDecorator } from 'src/core/application/decorators/exception.decorator'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { ConcreteExceptionReductor } from 'src/core/infraestructure/exception/exception.reductor'
import { ConcreteUUIDGenerator } from 'src/core/infraestructure/UUID/service/concrete.UUID.generator'
import { FranchiseMongoRepository } from 'src/franchise/infraestructure/repositories/franchise.mongo.repository'
import { ProviderMongoRepository } from 'src/provider/infraestructure/repositories/provider.mongo.repository'
import { Roles as RolesData } from 'src/user/domain/value-objects/roles'
import { UserGuard } from 'src/user/infraestructure/guards/auth/user.auth.guard'
import { Roles } from 'src/user/infraestructure/guards/roles/metadata/roles.metadata'
import { RolesGuard } from 'src/user/infraestructure/guards/roles/roles.guard'
import { UserMongoRepository } from 'src/user/infraestructure/repositories/user.mongo.repository'
import { ChatMongoRepository } from '../repositories/chat.mongo.repository'
import { MessageMongoRepository } from '../repositories/message.mongo.repository'
import { User as UserAuth } from 'src/user/infraestructure/decorators/user/user.decorator'
import { User } from 'src/user/domain/user'
import { GetChatsByProviderApplicationService } from 'src/chat/application/services/get-chats-provider/get.chats.provider.application.service'
import { GetProviderApplicationService } from 'src/provider/application/services/get-provider/get.provider.application.service'
import { FindUserApplicationService } from 'src/user/application/services/find-user/find.user.application.service'
import { GetChatsByClientApplicationService } from 'src/chat/application/services/get-chats-client/get.chats.client.application.service'
import { GetFranchiseDetailApplicationService } from 'src/franchise/application/services/get-franchise-detail/get.franchise.detail.application.service'
import { CreateChatByClientDTO } from './dto/create.client.dto'
import { CreateChatByClientApplicationService } from 'src/chat/application/services/create-chat-by-client/create.chat.client.application.service'
import { CreateChatByProviderDTO } from './dto/create.provider.dto'
import { CreateChatByProviderApplicationService } from 'src/chat/application/services/create-chat-by-provider/create.chat.provider.application.service'

@Controller('chat')
@ApiTags('chat')
@ApiHeader({
    name: 'auth',
})
@UseGuards(UserGuard)
export class ChatController {
    constructor(
        private chatRepository: ChatMongoRepository,
        private messageRepository: MessageMongoRepository,
        private providerRepository: ProviderMongoRepository,
        private franchiseRepository: FranchiseMongoRepository,
        private userRepository: UserMongoRepository,
        private uuidGenerator: ConcreteUUIDGenerator,
        private eventHandler: EventHandlerNative,
    ) {}

    @Post('create/client')
    @Roles(RolesData.USER)
    @UseGuards(RolesGuard)
    async createByClient(
        @UserAuth() user: User,
        @Body() data: CreateChatByClientDTO,
    ) {
        return await new ExceptionDecorator(
            new CreateChatByClientApplicationService(
                new GetFranchiseDetailApplicationService(
                    this.franchiseRepository,
                ),
                this.chatRepository,
                this.uuidGenerator,
                this.eventHandler,
            ),
            new ConcreteExceptionReductor(),
        ).execute({ ...data, client: user.id.value })
    }

    @Post('create/provider')
    @Roles(RolesData.PROVIDER)
    @UseGuards(RolesGuard)
    async createByProvider(
        @UserAuth() user: User,
        @Body() data: CreateChatByProviderDTO,
    ) {
        return await new ExceptionDecorator(
            new CreateChatByProviderApplicationService(
                new GetProviderApplicationService(this.providerRepository),
                new FindUserApplicationService(this.userRepository),
                this.chatRepository,
                this.uuidGenerator,
                this.eventHandler,
            ),
            new ConcreteExceptionReductor(),
        ).execute({ ...data, provider: user.id.value })
    }

    @Get('list/client')
    @Roles(RolesData.USER)
    @UseGuards(RolesGuard)
    async listByClient(@UserAuth() user: User) {
        return await new ExceptionDecorator(
            new GetChatsByClientApplicationService(
                new GetFranchiseDetailApplicationService(
                    this.franchiseRepository,
                ),
                this.chatRepository,
            ),
            new ConcreteExceptionReductor(),
        ).execute({ id: user.id.value })
    }

    @Get('list/provider')
    @Roles(RolesData.PROVIDER)
    @UseGuards(RolesGuard)
    async listByProvider(@UserAuth() user: User) {
        return await new ExceptionDecorator(
            new GetChatsByProviderApplicationService(
                new GetProviderApplicationService(this.providerRepository),
                new FindUserApplicationService(this.userRepository),
                this.chatRepository,
            ),
            new ConcreteExceptionReductor(),
        ).execute({ id: user.id.value })
    }

    @Get('messages/:chat')
    @Roles(RolesData.USER, RolesData.PROVIDER)
    @UseGuards(RolesGuard)
    async getMessages(
        @Param('chat', new ParseUUIDPipe()) chat: string,
        @Query('page', new ParseIntPipe()) page: number,
    ) {
        return await new ExceptionDecorator(
            new GetMessagesApplicationService(this.messageRepository),
            new ConcreteExceptionReductor(),
        ).execute({ chat, page })
    }
}
