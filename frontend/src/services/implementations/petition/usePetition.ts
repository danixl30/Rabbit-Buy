import { UseHttp } from '../../../core/abstractions/http/http'
import { MakePetition } from '../../abstractions/petition/dto/make-petition'
import { UsePetition } from '../../abstractions/petition/petition-service'
import { Petition } from '../../abstractions/petition/types/petition'

export const usePetition = (http: UseHttp): UsePetition => {
    const make = async (token: string, dto: MakePetition) => {
        const { job } = http.post<MakePetition, unknown>({
            url: 'petition/create',
            body: dto,
            headers: {
                auth: token,
            },
        })
        await job()
        return true
    }

    const getClient = async (token: string, page: number) => {
        const { job } = http.get<unknown, { petitions: Petition[] }>({
            url: '/petition/client/' + page,
            headers: {
                auth: token,
            },
        })
        return (await job()).body!!.petitions
    }

    const getClientTerm = async (token: string, page: number, term: string) => {
        const { job } = http.get<unknown, { petitions: Petition[] }>({
            url: '/petition/client/criteria/' + page,
            headers: {
                auth: token,
            },
            queries: {
                term,
            },
        })
        return (await job()).body!!.petitions
    }

    const getFranchise = async (token: string, page: number) => {
        const { job } = http.get<unknown, { petitions: Petition[] }>({
            url: '/petition/franchise/' + page,
            headers: {
                auth: token,
            },
        })
        return (await job()).body!!.petitions
    }

    const getFranchiseTerm = async (
        token: string,
        page: number,
        term: string,
    ) => {
        const { job } = http.get<unknown, { petitions: Petition[] }>({
            url: '/petition/franchise/criteria/' + page,
            headers: {
                auth: token,
            },
            queries: {
                term,
            },
        })
        return (await job()).body!!.petitions
    }

    const confirmPetition = async (token: string, id: string) => {
        const { job } = http.put<unknown, unknown>({
            url: 'petition/confirm/' + id,
            headers: {
                auth: token,
            },
        })
        await job()
        return true
    }

    return {
        make,
        getClient,
        getClientTerm,
        getFranchise,
        getFranchiseTerm,
        confirmPetition,
    }
}
