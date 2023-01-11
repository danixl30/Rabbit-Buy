import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { ApplicationService } from 'src/core/application/service/application.service'
import { FranchiseId } from 'src/franchise/domain/value-objects/franchise.id'
import { FranchiseRef } from 'src/petition/domain/value-objects/franchise.ref'
import { PetitionRepository } from '../../repositories/petition.repository'
import { FindPetitionsFranchiseQueryFactory } from '../list-petitions-franchise/queries/find.petition.franchise.factory'
import { DeletePetitionsByFranchiseDTO } from './types/dto'

export class DeletePetitionsByFranchiseApplicationService
    implements ApplicationService<DeletePetitionsByFranchiseDTO, void>
{
    constructor(
        private petitionRepository: PetitionRepository,
        private eventHandler: EventHandler,
    ) {}

    async execute(data: DeletePetitionsByFranchiseDTO): Promise<void> {
        const petitions = await this.petitionRepository.searchAll(
            new FindPetitionsFranchiseQueryFactory(
                new FranchiseRef(new FranchiseId(data.franchise)),
            ).create(),
        )
        petitions.forEach((petition) => petition.delete())
        await petitions.asyncForEach(async (petition) => {
            await this.petitionRepository.delete(petition)
        })
        this.eventHandler.publish(
            petitions.map((petition) => petition.pullEvents()).flat(),
        )
    }
}
