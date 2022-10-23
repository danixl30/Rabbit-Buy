import { ApplicationService } from 'src/core/application/service/application.service'
import { GetFranchiseDetailApplicationService } from 'src/franchise/application/services/get-franchise-detail/get.franchise.detail.application.service'
import { PetitionId } from 'src/petition/domain/value-objects/petition.id'
import { FindUserApplicationService } from 'src/user/application/services/find-user/find.user.application.service'
import { PetitionNotFoundException } from '../../exceptions/petition.not.found'
import { PetitionRepository } from '../../repositories/petition.repository'
import { PetitionPrimitiveDetail } from '../../types/petition.primitive.detail'
import { GetPetitionDetailDTO } from './types/dto'

export class GetPetitionDetailApplicationService
    implements
        ApplicationService<GetPetitionDetailDTO, PetitionPrimitiveDetail>
{
    constructor(
        private petitionRepository: PetitionRepository,
        private franchiseDetail: GetFranchiseDetailApplicationService,
        private getUser: FindUserApplicationService,
    ) {}

    async execute(
        data: GetPetitionDetailDTO,
    ): Promise<PetitionPrimitiveDetail> {
        const petition = await this.petitionRepository.searchById(
            new PetitionId(data.id),
        )
        if (!petition) throw new PetitionNotFoundException()
        const franchise = await this.franchiseDetail.execute({
            id: petition.franchise.value.value,
        })
        const client = await this.getUser.execute({
            id: petition.client.value.value,
        })
        return {
            id: petition.id.value,
            name: petition.productName.value,
            price: petition.price.value,
            currency: petition.currency.value,
            status: petition.status.value,
            quantity: petition.quantity.value,
            client: {
                name: client.username,
                email: client.email,
            },
            franchise: {
                name: franchise.name,
                id: franchise.id,
            },
            date: petition.date.value,
        }
    }
}
