import { ApplicationService } from 'src/core/application/service/application.service'
import { FranchiseId } from 'src/franchise/domain/value-objects/franchise.id'
import { FranchiseRef } from 'src/petition/domain/value-objects/franchise.ref'
import { GetProviderApplicationService } from 'src/provider/application/services/get-provider/get.provider.application.service'
import { FindUserApplicationService } from 'src/user/application/services/find-user/find.user.application.service'
import { PetitionRepository } from '../../repositories/petition.repository'
import { FindPetitionsFranchiseQueryFactory } from './queries/find.petition.franchise.factory'
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
        private userDetail: FindUserApplicationService,
    ) {}

    async execute(
        data: ListPetitionsFranchiseDTO,
    ): Promise<ListPetitionsFranchiseResponse> {
        const provider = await this.getProvider.execute({
            id: data.provider,
        })
        const petitions = await this.petitionRepository.searchAll(
            new FindPetitionsFranchiseQueryFactory(
                new FranchiseRef(FranchiseId.create(provider.franchise)),
                data.page,
            ).create(),
        )
        return {
            petitions: await petitions.asyncMap(async (e) => {
                const client = await this.userDetail.execute({
                    id: e.client.value.value,
                })
                return {
                    id: e.id.value,
                    name: e.productName.value,
                    price: e.price.value,
                    currency: e.currency.value,
                    status: e.status.value,
                    quantity: e.quantity.value,
                    client: {
                        name: client.username,
                        email: client.email,
                    },
                }
            }),
        }
    }
}
