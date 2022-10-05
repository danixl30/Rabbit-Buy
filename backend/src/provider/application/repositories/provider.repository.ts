import { Repository } from 'src/core/application/repository/repository'
import { Franchise } from 'src/franchise/domain/franchise'
import { Provider } from 'src/provider/domain/provider'
import { FranchiseRef } from 'src/provider/domain/value-objects/franchise.ref'
import { ProviderId } from 'src/provider/domain/value-objects/provider.id'

export interface ProviderRepository extends Repository<ProviderId, Provider> {
    findByFranchise(franchise: FranchiseRef): Promise<Franchise[]>
    searchById(id: ProviderId): Promise<Provider>
}
