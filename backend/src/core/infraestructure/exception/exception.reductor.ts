import {
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common'
import { ExceptionReductor } from 'src/core/application/exception-reductor/exception.reductor'
import { EMAIL_NOT_UNIC } from 'src/user/application/exceptions/email.not.unic'
import { INVALID_USER } from 'src/user/domain/exceptions/invalid.user'
import { INVALID_PASSWORD } from 'src/user/domain/exceptions/invalid.password'
import { USER_NOT_FOUND } from 'src/user/application/exceptions/user.not.found'
import { PRODUCT_NOT_FOUND } from 'src/product/application/exceptions/product.not.found'
import { PROVIDER_NOT_FOUND } from 'src/provider/application/exceptions/provider.not.found'
import { PETITION_NOT_FOUND } from 'src/petition/application/exceptions/petition.not.found'
import { CATEGORY_NOT_FOUND } from 'src/category/application/exceptions/category.not.found'
import { FRANCHISE_NOT_FOUND } from 'src/franchise/application/exceptions/franchise.not.found'
import { INVALID_GROUP_ID } from 'src/franchise/domain/exceptions/invalid.group.id'

const exceptions = {
    EMAIL_NOT_UNIC: () => new BadRequestException(EMAIL_NOT_UNIC),
    INVALID_GROUP_ID: () => new BadRequestException(INVALID_GROUP_ID),
    INVALID_USER: () => new BadRequestException(INVALID_USER),
    INVALID_PASSWORD: () => new BadRequestException(INVALID_PASSWORD),
    USER_NOT_FOUND: () => new NotFoundException(USER_NOT_FOUND),
    PRODUCT_NOT_FOUND: () => new NotFoundException(PRODUCT_NOT_FOUND),
    PROVIDER_NOT_FOUND: () => new NotFoundException(PROVIDER_NOT_FOUND),
    PETITION_NOT_FOUND: () => new NotFoundException(PETITION_NOT_FOUND),
    CATEGORY_NOT_FOUND: () => new NotFoundException(CATEGORY_NOT_FOUND),
    FRANCHISE_NOT_FOUND: () => new NotFoundException(FRANCHISE_NOT_FOUND),
}

export class ConcreteExceptionReductor implements ExceptionReductor {
    reduce(error: Error): void {
        console.log(error.message)
        console.log(error.stack)
        throw (
            exceptions[error.message]?.() ??
            new InternalServerErrorException(error.message || '')
        )
    }
}
