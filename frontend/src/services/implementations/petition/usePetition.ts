import { UseHttp } from '../../../core/abstractions/http/http'
import { MakePetition } from '../../abstractions/petition/dto/make-petition'
import { UsePetition } from '../../abstractions/petition/petition-service'

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

    return {
        make,
    }
}
