import { Repository } from 'src/core/application/repository/repository'
import { Petition } from 'src/petition/domain/petition'
import { PetitionDate } from 'src/petition/domain/value-objects/petition.date'
import { PetitionId } from 'src/petition/domain/value-objects/petition.id'
import { UserRef } from 'src/petition/domain/value-objects/user.ref'

export interface PetitionRepository extends Repository<PetitionId, Petition> {
    list(): Promise<Petition[]>
    filter(
        initialDate: PetitionDate,
        endDate: PetitionDate,
    ): Promise<Petition[]>
    filterByClient(client: UserRef): Promise<Petition[]>
}
