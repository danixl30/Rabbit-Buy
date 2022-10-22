import {
    Controller,
    UseGuards,
    Post,
    Body,
    UseInterceptors,
    UploadedFile,
    Get,
    Param,
    ParseUUIDPipe,
    ParseIntPipe,
    Query,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiConsumes, ApiHeader, ApiTags } from '@nestjs/swagger'
import { Express } from 'express'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { CloudinaryImageStorage } from 'src/core/infraestructure/storage/image-cloudinary/service/cloudinary.service'
import { ConcreteUUIDGenerator } from 'src/core/infraestructure/UUID/service/concrete.UUID.generator'
import { FranchiseMongoRepository } from 'src/franchise/infraestructure/repositories/franchise.mongo.repository'
import { ProviderMongoRepository } from 'src/provider/infraestructure/repositories/provider.mongo.repository'
import { UserGuard } from 'src/user/infraestructure/guards/auth/user.auth.guard'
import { ProductMongoRepository } from '../repositories/product.mongo.repository'
import { CreateProductRequestDTO } from './dto/create.product.request'
import { Roles as RolesData } from 'src/user/domain/value-objects/roles'
import { Roles } from 'src/user/infraestructure/guards/roles/metadata/roles.metadata'
import { RolesGuard } from 'src/user/infraestructure/guards/roles/roles.guard'
import { ExceptionDecorator } from 'src/core/application/decorators/exception.decorator'
import { CreateProductApplicationService } from 'src/product/application/services/create-product/create.product.application.service'
import { GetProviderApplicationService } from 'src/provider/application/services/get-provider/get.provider.application.service'
import { ConcreteExceptionReductor } from 'src/core/infraestructure/exception/exception.reductor'
import { User as UserAuth } from 'src/user/infraestructure/decorators/user/user.decorator'
import { User } from 'src/user/domain/user'
import { GetProductDetailApplicationService } from 'src/product/application/services/get-product-detail/product.detail.application.service'
import { ListProductsApplicationService } from 'src/product/application/services/list-products/list.products.application.service'
import { GetProductByCriteriaApplicationService } from 'src/product/application/services/get-by-criteria/get.products.criteria.application.service'
import { configImageMulter } from '../helpers/multer.helper'
import { FileFsManager } from 'src/core/infraestructure/files/fs/service/file.fs.manager'

@Controller('product')
@ApiTags('product')
export class ProductController {
    constructor(
        private productRepository: ProductMongoRepository,
        private uuidGenerator: ConcreteUUIDGenerator,
        private eventHandler: EventHandlerNative,
        private imageStorage: CloudinaryImageStorage,
        private franchiseRepository: FranchiseMongoRepository,
        private providerRepository: ProviderMongoRepository,
        private fileManager: FileFsManager,
    ) {}

    @Post('create')
    @ApiHeader({ name: 'auth' })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('image', configImageMulter))
    @Roles(RolesData.PROVIDER)
    @UseGuards(UserGuard, RolesGuard)
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body() createDTO: CreateProductRequestDTO,
        @UserAuth() user: User,
    ) {
        createDTO.categories = createDTO.categories || []
        const res = await new ExceptionDecorator(
            new CreateProductApplicationService(
                this.productRepository,
                this.uuidGenerator,
                new GetProviderApplicationService(this.providerRepository),
                this.imageStorage,
                this.eventHandler,
            ),
            new ConcreteExceptionReductor(),
        ).execute({ ...createDTO, image: file.path, provider: user.id.value })
        await this.fileManager.delete({ path: file.path })
        return res
    }

    @Get('list/:page')
    async list(@Param('page', new ParseIntPipe()) page: number) {
        return await new ExceptionDecorator(
            new ListProductsApplicationService(this.productRepository),
            new ConcreteExceptionReductor(),
        ).execute({ page })
    }

    @Get('search')
    async search(
        @Query('term') term: string,
        @Query('page', new ParseIntPipe()) page: number,
    ) {
        return await new ExceptionDecorator(
            new GetProductByCriteriaApplicationService(this.productRepository),
            new ConcreteExceptionReductor(),
        ).execute({ page, text: term })
    }

    @Get(':id')
    async detail(@Param('id', new ParseUUIDPipe()) id: string) {
        return await new ExceptionDecorator(
            new GetProductDetailApplicationService(
                this.productRepository,
                null,
                this.franchiseRepository,
            ),
            new ConcreteExceptionReductor(),
        ).execute({ id })
    }
}
