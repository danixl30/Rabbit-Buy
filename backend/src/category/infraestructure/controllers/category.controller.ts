import {
    Controller,
    Post,
    UseGuards,
    Body,
    Put,
    Delete,
    Param,
    ParseUUIDPipe,
    Get,
} from '@nestjs/common'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { UserGuard } from 'src/user/infraestructure/guards/auth/user.auth.guard'
import { Roles as RolesData } from 'src/user/domain/value-objects/roles'
import { Roles } from 'src/user/infraestructure/guards/roles/metadata/roles.metadata'
import { RolesGuard } from 'src/user/infraestructure/guards/roles/roles.guard'
import { ExceptionDecorator } from 'src/core/application/decorators/exception.decorator'
import { CreateCategoryDTO } from './dto/create.category.dto'
import { CategoryMongoRepository } from '../repositories/category.mongo.repository'
import { ConcreteUUIDGenerator } from 'src/core/infraestructure/UUID/service/concrete.UUID.generator'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { CreateCategoryApplicationService } from 'src/category/application/services/create-category/create.category.application.service'
import { ConcreteExceptionReductor } from 'src/core/infraestructure/exception/exception.reductor'
import { CreateSubCategoryDTO } from './dto/create.subcategory.dto'
import { CreateSubCategoryApplicationService } from 'src/category/application/services/create-subcategory/create.sub.category.application.service'
import { ModifyCategoryDTO } from './dto/modify.category'
import { ModifyCategoryApplicationService } from 'src/category/application/services/modify-category/modify.category.application.service'
import { DeleteCategoryApplicationService } from 'src/category/application/services/delete-category/delete.category.application.service'
import { ListCategoryApplicationService } from 'src/category/application/services/list-categories/list.categories.application.service'
import { ListSubCategoriesApplicationService } from 'src/category/application/services/list-subcategories/list.sub.categories.application.service'

@Controller('category')
@ApiTags('category')
export class CategoryController {
    constructor(
        private categoryRepository: CategoryMongoRepository,
        private uuidGenerator: ConcreteUUIDGenerator,
        private eventHandler: EventHandlerNative,
    ) {}

    @Post('create')
    @ApiHeader({ name: 'auth' })
    @Roles(RolesData.PROVIDER, RolesData.ADMIN)
    @UseGuards(UserGuard, RolesGuard)
    async create(@Body() data: CreateCategoryDTO) {
        return await new ExceptionDecorator(
            new CreateCategoryApplicationService(
                this.categoryRepository,
                this.uuidGenerator,
                this.eventHandler,
            ),
            new ConcreteExceptionReductor(),
        ).execute(data)
    }

    @Post('subcategory/create')
    @ApiHeader({ name: 'auth' })
    @Roles(RolesData.PROVIDER, RolesData.ADMIN)
    @UseGuards(UserGuard, RolesGuard)
    async createSubcategory(@Body() data: CreateSubCategoryDTO) {
        return await new ExceptionDecorator(
            new CreateSubCategoryApplicationService(
                this.categoryRepository,
                this.uuidGenerator,
                this.eventHandler,
            ),
            new ConcreteExceptionReductor(),
        ).execute(data)
    }

    @Put('modify')
    @ApiHeader({ name: 'auth' })
    @Roles(RolesData.PROVIDER, RolesData.ADMIN)
    @UseGuards(UserGuard, RolesGuard)
    async modify(@Body() data: ModifyCategoryDTO) {
        return await new ExceptionDecorator(
            new ModifyCategoryApplicationService(
                this.categoryRepository,
                this.eventHandler,
            ),
            new ConcreteExceptionReductor(),
        ).execute(data)
    }

    @Delete()
    @ApiHeader({ name: 'auth' })
    @Roles(RolesData.PROVIDER, RolesData.ADMIN)
    @UseGuards(UserGuard, RolesGuard)
    async delete(@Param('id', new ParseUUIDPipe()) id: string) {
        return await new ExceptionDecorator(
            new DeleteCategoryApplicationService(
                this.categoryRepository,
                this.eventHandler,
            ),
            new ConcreteExceptionReductor(),
        ).execute({ id })
    }

    @Get()
    async getCategories() {
        return await new ExceptionDecorator(
            new ListCategoryApplicationService(this.categoryRepository),
            new ConcreteExceptionReductor(),
        ).execute(undefined)
    }

    @Get('subcategories/:parent')
    async getSubCategories(
        @Param('parent', new ParseUUIDPipe()) parent: string,
    ) {
        return await new ExceptionDecorator(
            new ListSubCategoriesApplicationService(this.categoryRepository),
            new ConcreteExceptionReductor(),
        ).execute({ parent })
    }
}
