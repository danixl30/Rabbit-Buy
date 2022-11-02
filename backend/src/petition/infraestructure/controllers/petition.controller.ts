import {
    Controller,
    Query,
    UseGuards,
    Post,
    Body,
    Get,
    Param,
    ParseUUIDPipe,
    ParseIntPipe,
    Put,
} from '@nestjs/common'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { ConcreteUUIDGenerator } from 'src/core/infraestructure/UUID/service/concrete.UUID.generator'
import { ProductMongoRepository } from 'src/product/infraestructure/repositories/product.mongo.repository'
import { UserGuard } from 'src/user/infraestructure/guards/auth/user.auth.guard'
import { PetitionMongoRepository } from '../repositories/petition.mongo.repository'
import { CreatePetitionRequestDTO } from './dto/create.petition.request'
import { User as UserAuth } from 'src/user/infraestructure/decorators/user/user.decorator'
import { User } from 'src/user/domain/user'
import { ExceptionDecorator } from 'src/core/application/decorators/exception.decorator'
import { CreatePetitionApplicationService } from 'src/petition/application/services/create-petition/create.petition.application.service'
import { GetProductDetailApplicationService } from 'src/product/application/services/get-product-detail/product.detail.application.service'
import { ConcreteExceptionReductor } from 'src/core/infraestructure/exception/exception.reductor'
import { FranchiseMongoRepository } from 'src/franchise/infraestructure/repositories/franchise.mongo.repository'
import { GetPetitionDetailApplicationService } from 'src/petition/application/services/get-petition-detail/get.petition.detail.application.service'
import { GetFranchiseDetailApplicationService } from 'src/franchise/application/services/get-franchise-detail/get.franchise.detail.application.service'
import { FindUserApplicationService } from 'src/user/application/services/find-user/find.user.application.service'
import { UserMongoRepository } from 'src/user/infraestructure/repositories/user.mongo.repository'
import { ListPetitionsClientApplicationService } from 'src/petition/application/services/list-petitions-client/list.petitions.client.application.service'
import { ListPetitionsProviderApplicationService } from 'src/petition/application/services/list-petitions-franchise/list.petition.frnchise.application.service'
import { GetProviderApplicationService } from 'src/provider/application/services/get-provider/get.provider.application.service'
import { ProviderMongoRepository } from 'src/provider/infraestructure/repositories/provider.mongo.repository'
import { Roles as RolesData } from 'src/user/domain/value-objects/roles'
import { Roles } from 'src/user/infraestructure/guards/roles/metadata/roles.metadata'
import { RolesGuard } from 'src/user/infraestructure/guards/roles/roles.guard'
import { ListPetitionsClientCriteriaApplicationService } from 'src/petition/application/services/list-petitions-client-by-criteria/list.petitions.client.criteria.application.service'
import { ListPetitionsProviderCriteriaApplicationService } from 'src/petition/application/services/list-petitions-franchise-by-criteria/list.petition.frnchise.criteria.application.service'
import { ChangePetitionStatusApplicationService } from 'src/petition/application/services/change-status/change.status.application.service'
import { Statuses } from 'src/petition/domain/value-objects/statuses'

@Controller('petition')
@ApiHeader({ name: 'auth' })
@ApiTags('petition')
@UseGuards(UserGuard)
export class PetitionController {
    constructor(
        private petitionRepository: PetitionMongoRepository,
        private uuidGenerator: ConcreteUUIDGenerator,
        private eventHandler: EventHandlerNative,
        private productRepository: ProductMongoRepository,
        private franchiseRepository: FranchiseMongoRepository,
        private userRepository: UserMongoRepository,
        private providerRepository: ProviderMongoRepository,
    ) {}

    @Post('create')
    @Roles(RolesData.USER)
    @UseGuards(RolesGuard)
    async create(
        @Body() createDto: CreatePetitionRequestDTO,
        @UserAuth() user: User,
    ) {
        return await new ExceptionDecorator(
            new CreatePetitionApplicationService(
                this.petitionRepository,
                new GetProductDetailApplicationService(
                    this.productRepository,
                    null,
                    this.franchiseRepository,
                ),
                this.uuidGenerator,
                this.eventHandler,
            ),
            new ConcreteExceptionReductor(),
        ).execute({ ...createDto, userId: user.id.value })
    }

    @Get('client/:page')
    @Roles(RolesData.USER)
    @UseGuards(RolesGuard)
    async getByClient(
        @UserAuth() user: User,
        @Param('page', new ParseIntPipe()) page: number,
    ) {
        return await new ExceptionDecorator(
            new ListPetitionsClientApplicationService(this.petitionRepository),
            new ConcreteExceptionReductor(),
        ).execute({ client: user.id.value, page })
    }

    @Get('client/criteria/:page')
    @Roles(RolesData.USER)
    @UseGuards(RolesGuard)
    async getByClientCriteria(
        @UserAuth() user: User,
        @Param('page', new ParseIntPipe()) page: number,
        @Query('term') term: string,
    ) {
        return await new ExceptionDecorator(
            new ListPetitionsClientCriteriaApplicationService(
                this.petitionRepository,
            ),
            new ConcreteExceptionReductor(),
        ).execute({ client: user.id.value, page, term })
    }

    @Get('franchise/:page')
    @Roles(RolesData.PROVIDER)
    @UseGuards(RolesGuard)
    async getByFranchise(
        @UserAuth() user: User,
        @Param('page', new ParseIntPipe()) page: number,
    ) {
        return await new ExceptionDecorator(
            new ListPetitionsProviderApplicationService(
                this.petitionRepository,
                new GetProviderApplicationService(this.providerRepository),
                new FindUserApplicationService(this.userRepository),
            ),
            new ConcreteExceptionReductor(),
        ).execute({ provider: user.id.value, page })
    }

    @Get('franchise/criteria/:page')
    @Roles(RolesData.PROVIDER)
    @UseGuards(RolesGuard)
    async getByFranchiseCriteria(
        @UserAuth() user: User,
        @Param('page', new ParseIntPipe()) page: number,
        @Query('term') term: string,
    ) {
        return await new ExceptionDecorator(
            new ListPetitionsProviderCriteriaApplicationService(
                this.petitionRepository,
                new GetProviderApplicationService(this.providerRepository),
                new FindUserApplicationService(this.userRepository),
            ),
            new ConcreteExceptionReductor(),
        ).execute({ provider: user.id.value, page, term })
    }

    @Put('confirm/:id')
    @Roles(RolesData.PROVIDER)
    @UseGuards(RolesGuard)
    async confirm(@Param('id', new ParseUUIDPipe()) id: string) {
        return await new ExceptionDecorator(
            new ChangePetitionStatusApplicationService(
                this.petitionRepository,
                this.eventHandler,
            ),
            new ConcreteExceptionReductor(),
        ).execute({
            id,
            status: Statuses.CONFIRMED,
        })
    }

    @Get(':id')
    async getDetail(@Param('id', new ParseUUIDPipe()) id: string) {
        return await new ExceptionDecorator(
            new GetPetitionDetailApplicationService(
                this.petitionRepository,
                new GetFranchiseDetailApplicationService(
                    this.franchiseRepository,
                ),
                new FindUserApplicationService(this.userRepository),
            ),
            new ConcreteExceptionReductor(),
        ).execute({ id })
    }
}
