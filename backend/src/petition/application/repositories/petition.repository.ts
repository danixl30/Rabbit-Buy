import { Petition } from 'src/petition/domain/petition'
import { PetitionDate } from 'src/petition/domain/value-objects/petition.date'
import { PetitionId } from 'src/petition/domain/value-objects/petition.id'
import { ProductRef } from 'src/petition/domain/value-objects/product.ref'
import { Status } from 'src/petition/domain/value-objects/status'
import { UserRef } from 'src/petition/domain/value-objects/user.ref'

export interface PetitionRepository {
    save(
        product: ProductRef,
        client: UserRef,
        date: PetitionDate,
        status: Status,
    ): Promise<Petition>
    changeStatus(id: PetitionId, status: Status): Promise<Petition>
    list(): Promise<Petition[]>
    filter(
        initialDate: PetitionDate,
        endDate: PetitionDate,
    ): Promise<Petition[]>
    filterByClient(client: UserRef): Promise<Petition[]>
}
