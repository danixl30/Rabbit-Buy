import {
    Controller,
    Post,
    UseGuards,
    Body,
    Get,
    Param,
    ParseUUIDPipe,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common'
import { Express } from 'express'
import { ApiConsumes, ApiHeader, ApiTags } from '@nestjs/swagger'
import { UserGuard } from 'src/user/infraestructure/guards/auth/user.auth.guard'
import { Roles } from 'src/user/infraestructure/guards/roles/metadata/roles.metadata'
import { RolesGuard } from 'src/user/infraestructure/guards/roles/roles.guard'
import { Roles as RolesData } from 'src/user/domain/value-objects/roles'
import { CreateFranchiseRequestDTO } from './dto/create.franchise.request'
import { ExceptionDecorator } from 'src/core/application/decorators/exception.decorator'
import { CreateFranchiseApplicationService } from 'src/franchise/application/services/create-franchise/create.franchise'
import { ConcreteExceptionReductor } from 'src/core/infraestructure/exception/exception.reductor'
import { FranchiseMongoRepository } from '../repositories/franchise.mongo.repository'
import { ConcreteUUIDGenerator } from 'src/core/infraestructure/UUID/service/concrete.UUID.generator'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { ListFranchisesApplicationService } from 'src/franchise/application/services/list-franchises/list.franchises.application.service'
import { GetFranchiseDetailApplicationService } from 'src/franchise/application/services/get-franchise-detail/get.franchise.detail.application.service'
import { CloudinaryImageStorage } from 'src/core/infraestructure/storage/image-cloudinary/service/cloudinary.service'
import { FileFsManager } from 'src/core/infraestructure/files/fs/service/file.fs.manager'
import { FileInterceptor } from '@nestjs/platform-express'
import { configImageMulter } from 'src/product/infraestructure/helpers/multer.helper'

@Controller('franchise')
@ApiTags('franchise')
@UseGuards(UserGuard)
@ApiHeader({
    name: 'auth',
})
export class FranchiseController {
    constructor(
        private franchiseRepository: FranchiseMongoRepository,
        private uuidGenerator: ConcreteUUIDGenerator,
        private eventHandler: EventHandlerNative,
        private imageStorage: CloudinaryImageStorage,
        private fileManager: FileFsManager,
    ) {}

    @Post('create')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('image', configImageMulter))
    @Roles(RolesData.ADMIN)
    @UseGuards(RolesGuard)
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body() createDTO: CreateFranchiseRequestDTO,
    ) {
        const dto = {
            ...createDTO,
            image: file.path,
        }
        const res = await new ExceptionDecorator(
            new CreateFranchiseApplicationService(
                this.franchiseRepository,
                this.uuidGenerator,
                this.eventHandler,
                this.imageStorage,
            ),
            new ConcreteExceptionReductor(),
        ).execute(dto)
        await this.fileManager.delete({
            path: file.path,
        })
        return res
    }

    @Get('list')
    async list() {
        return await new ExceptionDecorator(
            new ListFranchisesApplicationService(this.franchiseRepository),
            new ConcreteExceptionReductor(),
        ).execute(undefined)
    }

    @Get(':id')
    @Roles(RolesData.ADMIN)
    @UseGuards(RolesGuard)
    async getDetail(@Param('id', new ParseUUIDPipe()) id: string) {
        return await new ExceptionDecorator(
            new GetFranchiseDetailApplicationService(this.franchiseRepository),
            new ConcreteExceptionReductor(),
        ).execute({ id })
    }
}
