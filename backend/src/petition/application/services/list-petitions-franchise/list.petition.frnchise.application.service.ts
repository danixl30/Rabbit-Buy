import { ApplicationService } from 'src/core/application/service/application.service'
import { FranchiseId } from 'src/franchise/domain/value-objects/franchise.id'
import { FranchiseRef } from 'src/petition/domain/value-objects/franchise.ref'
import { GetProviderApplicationService } from 'src/provider/application/services/get-provider/get.provider.application.service'
import { PetitionRepository } from '../../repositories/petition.repository'
import { ListPetitionsFranchiseDTO } from './types/dto'
import { ListPetitionsFranchiseResponse } from './types/response'

export class ListPetitionsProviderApplicationService
    implements
        ApplicationService<
            ListPetitionsFranchiseDTO,
            ListPetitionsFranchiseResponse
        >
{
    constructor(
        private petitionRepository: PetitionRepository,
        private getProvider: GetProviderApplicationService,
    ) {}

    async execute(
        data: ListPetitionsFranchiseDTO,
    ): Promise<ListPetitionsFranchiseResponse> {
        const provider = await this.getProvider.execute({
            id: data.provider,
        })
        const petitions = await this.petitionRepository.filterByFranchise(
            new FranchiseRef(new FranchiseId(provider.id)),
            {
                page: data.page,
            },
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
