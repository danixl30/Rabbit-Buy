import { UseHttp } from '../../../core/abstractions/http/http'
import { CreateFranchise } from '../../abstractions/franchise/dto/create-franchise'
import { UseFranchise } from '../../abstractions/franchise/franchise-service'

export const useFranchise = (http: UseHttp): UseFranchise => {
    const create = async (token: string, dto: CreateFranchise) => {
        const { job } = http.post<CreateFranchise, unknown>({
            url: 'franchise/create',
            body: dto,
            headers: {
                auth: token,
            },
        })
        await job()
        return true
    }

    return {
        create,
    }
}
