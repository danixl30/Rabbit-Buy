import { Repository } from 'src/core/application/repository/repository'
import { Provider } from 'src/provider/domain/provider'
import { FranchiseRef } from 'src/provider/domain/value-objects/franchise.ref'
import { ProviderId } from 'src/provider/domain/value-objects/provider.id'

export interface ProviderRepository extends Repository<ProviderId, Provider> {
    findByFranchise(franchise: FranchiseRef): Promise<Provider[]>
    searchById(id: ProviderId): Promise<Provider>
}
