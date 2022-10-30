import { UseHttp } from '../../../core/abstractions/http/http'
import { CreateFranchise } from '../../abstractions/franchise/dto/create-franchise'
import { UseFranchise } from '../../abstractions/franchise/franchise-service'
import { Franchise } from '../../abstractions/franchise/types/franchise'
import { FranchiseDetail } from '../../abstractions/franchise/types/franchise-detail'

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

    const getAll = async (token: string) => {
        const { job } = http.get<unknown, { franchises: Franchise[] }>({
            url: '/franchise/list',
            headers: {
                auth: token,
            },
        })

        return (await job()).body!!.franchises
    }

    const getDetail = async (token: string, id: string) => {
        const { job } = http.get<unknown, FranchiseDetail>({
            url: '/franchise/' + id,
            headers: {
                auth: token,
            },
        })
        return (await job()).body!!
    }

    return {
        create,
        getAll,
        getDetail,
    }
}
