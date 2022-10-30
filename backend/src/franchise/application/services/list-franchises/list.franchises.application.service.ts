import { ApplicationService } from 'src/core/application/service/application.service'
import { FranchiseRepository } from '../../repositories/franchise.repository'
import { ListFranchisesResponse } from './types/list.franchises.response'

export class ListFranchisesApplicationService
    implements ApplicationService<undefined, ListFranchisesResponse>
{
    constructor(private franchiseRepository: FranchiseRepository) {}

    async execute(_: undefined = undefined): Promise<ListFranchisesResponse> {
        const franchises = await this.franchiseRepository.list()
        return {
            franchises: franchises.map((e) => ({
                name: e.name.value,
                id: e.id.value,
                rif: e.rif.value,
            })),
        }
    }
}
