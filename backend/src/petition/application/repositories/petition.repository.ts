import { Repository } from 'src/core/application/repository/repository'
import { Petition } from 'src/petition/domain/petition'
import { FranchiseRef } from 'src/petition/domain/value-objects/franchise.ref'
import { PetitionDate } from 'src/petition/domain/value-objects/petition.date'
import { PetitionId } from 'src/petition/domain/value-objects/petition.id'
import { UserRef } from 'src/petition/domain/value-objects/user.ref'
import { CriteriaValues } from '../types/criteria.values'
import { PaginationDTO } from '../types/pagination.dto'

export interface PetitionRepository extends Repository<PetitionId, Petition> {
    list(): Promise<Petition[]>
    filter(
        initialDate: PetitionDate,
        endDate: PetitionDate,
    ): Promise<Petition[]>
    filterByClient(client: UserRef, page?: PaginationDTO): Promise<Petition[]>
    filterByFranchise(
        franchise: FranchiseRef,
        page?: PaginationDTO,
    ): Promise<Petition[]>
    filterByClientCriteria(
        client: UserRef,
        criterias: CriteriaValues,
        page?: PaginationDTO,
    ): Promise<Petition[]>
    filterByFranchiseCriteria(
        franchise: FranchiseRef,
        criterias: CriteriaValues,
        page?: PaginationDTO,
    ): Promise<Petition[]>
    searchById(id: PetitionId): Promise<Petition>
}
