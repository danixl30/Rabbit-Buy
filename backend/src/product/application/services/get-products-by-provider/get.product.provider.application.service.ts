import { ApplicationService } from 'src/core/application/service/application.service'
import { GetProviderApplicationService } from 'src/provider/application/services/get-provider/get.provider.application.service'
import { FilterByCriteriaResponse } from '../get-by-criteria/types/filter.products.criteria.response'
import { GetProductsByProviderDTO } from './types/dto'
import { GetProductByFranchiseApplicationService } from '../get-products-by-franchise/get.produccts.franchise.application.service'

export class GetProductsByProviderApplicationService
    implements
        ApplicationService<GetProductsByProviderDTO, FilterByCriteriaResponse>
{
    constructor(
        private getProviderService: GetProviderApplicationService,
        private getProductsService: GetProductByFranchiseApplicationService,
    ) {}

    async execute(
        data: GetProductsByProviderDTO,
    ): Promise<FilterByCriteriaResponse> {
        const provider = await this.getProviderService.execute({
            id: data.provider,
        })
        return this.getProductsService.execute({
            franchise: provider.franchise,
            page: data.page,
            text: data.text,
        })
    }
}
