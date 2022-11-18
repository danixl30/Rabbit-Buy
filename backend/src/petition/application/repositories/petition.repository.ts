import { Criteria } from 'src/core/application/repository/query/criteria'
import { Repository } from 'src/core/application/repository/repository'
import { Petition } from 'src/petition/domain/petition'
import { PetitionId } from 'src/petition/domain/value-objects/petition.id'

export interface PetitionRepository extends Repository<PetitionId, Petition> {
    searchById(id: PetitionId): Promise<Petition>
    searchAll(criteria: Criteria): Promise<Petition[]>
    searchOne(criteria: Criteria): Promise<Petition>
}
