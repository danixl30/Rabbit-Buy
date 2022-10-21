import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { ExceptionDecorator } from 'src/core/application/decorators/exception.decorator'
import { Sha256Service } from 'src/core/infraestructure/crypto/sha256-crypto/service/sha256.crypto'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { ConcreteExceptionReductor } from 'src/core/infraestructure/exception/exception.reductor'
import { ConcreteUUIDGenerator } from 'src/core/infraestructure/UUID/service/concrete.UUID.generator'
import { FranchiseMongoRepository } from 'src/franchise/infraestructure/repositories/franchise.mongo.repository'
import { CreateProviderApplicationService } from 'src/provider/application/services/create-provider/create.provider.application.service'
import { RegisterUserApplicationService } from 'src/user/application/services/register-user/register.user.application.service'
import { UserMongoRepository } from 'src/user/infraestructure/repositories/user.mongo.repository'
import { ProviderMongoRepository } from '../repositories/provider.mongo.repository'
import { CreateProviderRequestDTO } from './dto/create.provider.request'
import { Roles as RolesData } from 'src/user/domain/value-objects/roles'
import { UserGuard } from 'src/user/infraestructure/guards/auth/user.auth.guard'
import { Roles } from 'src/user/infraestructure/guards/roles/metadata/roles.metadata'
import { RolesGuard } from 'src/user/infraestructure/guards/roles/roles.guard'
import { User as UserAuth } from 'src/user/infraestructure/decorators/user/user.decorator'
import { User } from 'src/user/domain/user'
import { GetProviderApplicationService } from 'src/provider/application/services/get-provider/get.provider.application.service'

@Controller('provider')
@ApiTags('provider')
export class ProviderController {
    constructor(
        private providerRepository: ProviderMongoRepository,
        private uuidGenerator: ConcreteUUIDGenerator,
        private eventHandler: EventHandlerNative,
        private crypto: Sha256Service,
        private userRepository: UserMongoRepository,
        private franchiseRepository: FranchiseMongoRepository,
    ) {}

    @Post('create')
    async create(@Body() createDto: CreateProviderRequestDTO) {
        return await new ExceptionDecorator(
            new CreateProviderApplicationService(
                new RegisterUserApplicationService(
                    this.userRepository,
                    this.crypto,
                    this.uuidGenerator,
                ),
                this.providerRepository,
                this.franchiseRepository,
                this.eventHandler,
            ),
            new ConcreteExceptionReductor(),
        ).execute({ ...createDto, role: RolesData.PROVIDER })
    }

    @Get()
    @ApiHeader({ name: 'auth' })
    @Roles(RolesData.PROVIDER)
    @UseGuards(UserGuard, RolesGuard)
    async get(@UserAuth() user: User) {
        return await new ExceptionDecorator(
            new GetProviderApplicationService(this.providerRepository),
            new ConcreteExceptionReductor(),
        ).execute({ id: user.id.value })
    }
}
