import { FranchiseId } from 'src/franchise/domain/value-objects/franchise.id'
import { Petition } from 'src/petition/domain/petition'
import { FranchiseRef } from 'src/petition/domain/value-objects/franchise.ref'
import { PetitionDate } from 'src/petition/domain/value-objects/petition.date'
import { PetitionId } from 'src/petition/domain/value-objects/petition.id'
import { PetitionQuantity } from 'src/petition/domain/value-objects/petition.quantity'
import { ProductCurrency } from 'src/petition/domain/value-objects/product.currency'
import { ProductName } from 'src/petition/domain/value-objects/product.name'
import { ProductPrice } from 'src/petition/domain/value-objects/product.price'
import { ProductRef } from 'src/petition/domain/value-objects/product.ref'
import { Status } from 'src/petition/domain/value-objects/status'
import { UserRef } from 'src/petition/domain/value-objects/user.ref'
import { ProductId } from 'src/product/domain/value-objects/product.id'
import { UserId } from 'src/user/domain/value-objects/user.id'
import { PetitionDocument } from '../models/petition.model'

export const petitionDbToDomain = (petition: PetitionDocument): Petition =>
    Petition.create(
        PetitionId.create(petition.id),
        ProductName.create(petition.productName),
        ProductRef.create(ProductId.create(petition.productId)),
        ProductPrice.create(petition.productPrice),
        PetitionQuantity.create(petition.quantiny),
        ProductCurrency.create(petition.productCurrency),
        UserRef.create(UserId.create(petition.client)),
        PetitionDate.create(petition.date),
        FranchiseRef.create(FranchiseId.create(petition.franchise)),
        Status.create(petition.status),
    )
