import { Repository } from 'src/core/application/repository/repository'
import { Franchise } from 'src/franchise/domain/franchise'
import { FranchiseGroupId } from 'src/franchise/domain/value-objects/franchise.group.id'
import { FranchiseId } from 'src/franchise/domain/value-objects/franchise.id'

export interface FranchiseRepository
    extends Repository<FranchiseId, Franchise> {
    list(): Promise<Franchise[]>
    searchById(id: FranchiseId): Promise<Franchise>
    searchByGroudId(groudId: FranchiseGroupId): Promise<Franchise>
}
