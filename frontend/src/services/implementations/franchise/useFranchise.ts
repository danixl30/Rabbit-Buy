import { UseHttp } from '../../../core/abstractions/http/http'
import {ChangeFranchiseImageDTO} from '../../abstractions/franchise/dto/change-image'
import { ChangeFranchiseName } from '../../abstractions/franchise/dto/change-name'
import { CreateFranchise } from '../../abstractions/franchise/dto/create-franchise'
import { UseFranchise } from '../../abstractions/franchise/franchise-service'
import { Franchise } from '../../abstractions/franchise/types/franchise'
import { FranchiseDetail } from '../../abstractions/franchise/types/franchise-detail'

type CreateFranchiseRequest = {
    name: string
    rif: string
}

export const useFranchise = (http: UseHttp): UseFranchise => {
    const create = async (token: string, dto: CreateFranchise) => {
        const { job } = http.upload<CreateFranchiseRequest, unknown>(
            {
                url: 'franchise/create',
                body: {
                    rif: dto.rif,
                    name: dto.name,
                },
                headers: {
                    auth: token,
                },
                files: {
                    image: dto.image,
                },
            },
            () => {},
        )
        await job()
        return true
    }

    const getAll = async () => {
        const { job } = http.get<unknown, { franchises: Franchise[] }>({
            url: '/franchise/list',
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

    const generateGroupId = async (token: string, id: string) => {
        const { job } = http.put<unknown, unknown>({
            url: '/franchise/update/group-id/' + id,
            headers: {
                auth: token,
            },
        })
        await job()
        return true
    }

    const changeName = async (token: string, dto: ChangeFranchiseName) => {
        const { job } = http.put<ChangeFranchiseName, unknown>({
            url: '/franchise/update/name',
            headers: {
                auth: token,
            },
            body: dto,
        })
        await job()
        return true
    }

    const changeImage = async (token: string, dto: ChangeFranchiseImageDTO) => {
        const { job } = http.upload<{}, unknown>({
            url: '/franchise/update/image/' + dto.id,
            headers: {
                auth: token
            },
            files: {
                image: dto.image
            }
        }, () => {})
        await job()
    }

    const deleteFranchise = async (token: string, id: string) => {
        const { job } = http.delete<unknown, unknown>({
            url: '/franchise/update/group-id/' + id,
            headers: {
                auth: token,
            },
        })
        await job()
        return true
    }

    return {
        create,
        getAll,
        getDetail,
        generateGroupId,
        delete: deleteFranchise,
        changeName,
        changeImage
    }
}
