import { FranchiseId } from 'src/franchise/domain/value-objects/franchise.id'
import { Provider } from 'src/provider/domain/provider'
import { FranchiseRef } from 'src/provider/domain/value-objects/franchise.ref'
import { ProviderId } from 'src/provider/domain/value-objects/provider.id'
import { ProviderDocument } from '../models/provider.model'

export const providerDbToDomain = (provider: ProviderDocument): Provider =>
    new Provider(
        new ProviderId(provider.id),
        new FranchiseRef(new FranchiseId(provider.franchise)),
    )
