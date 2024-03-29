import { ApplicationService } from 'src/core/application/service/application.service'
import { UserRef } from 'src/petition/domain/value-objects/user.ref'
import { UserId } from 'src/user/domain/value-objects/user.id'
import { PetitionRepository } from '../../repositories/petition.repository'
import { FindPetitionsClientTermQueryFactory } from './queries/find.petitions.client.term.factory'
import { ListPetitionsClientDTO } from './types/dto'
import { ListPetitionsClientResponse } from './types/response'

export class ListPetitionsClientCriteriaApplicationService
    implements
        ApplicationService<ListPetitionsClientDTO, ListPetitionsClientResponse>
{
    constructor(private petitionRepository: PetitionRepository) {}

    async execute(
        data: ListPetitionsClientDTO,
    ): Promise<ListPetitionsClientResponse> {
        const petitions = await this.petitionRepository.searchAll(
            new FindPetitionsClientTermQueryFactory(
                UserRef.create(UserId.create(data.client)),
                data.term,
                data.page,
            ).create(),
        )
        return {
            petitions: petitions.map((e) => ({
                id: e.id.value,
                name: e.productName.value,
                price: e.price.value,
                currency: e.currency.value,
                status: e.status.value,
                quantity: e.quantity.value,
            })),
        }
    }
}
