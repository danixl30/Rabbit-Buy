import { Criteria } from 'src/core/application/repository/query/criteria'
import { Repository } from 'src/core/application/repository/repository'
import { Franchise } from 'src/franchise/domain/franchise'
import { FranchiseId } from 'src/franchise/domain/value-objects/franchise.id'

export interface FranchiseRepository
    extends Repository<FranchiseId, Franchise> {
    searchById(id: FranchiseId): Promise<Franchise>
    searchAll(criteria: Criteria): Promise<Franchise[]>
    searchOne(criteria: Criteria): Promise<Franchise>
}
