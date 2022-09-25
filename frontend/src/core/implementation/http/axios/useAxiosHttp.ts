import { UseHttp } from '../../../abstractions/http/http'
import { RequestConfiguration } from '../../../abstractions/http/types/config/request-configuration'
import { Response } from '../../../abstractions/http/types/response/response'
import axios from 'axios'
import { Job } from '../../../abstractions/http/types/job/job'
import { abortControllerBuilder } from './abort-controller/abort-controller-builder'

const core = axios.create({
    url: 'http://localhost:4000',
})

export const useAxiosHttp = (): UseHttp => {
    const get = <T, U>(data: RequestConfiguration<T>): Job<U> => {
        const body = data.body || {}
        const headers = data.headers || {}
        const { signal, cancel } = abortControllerBuilder()
        const job = async (): Promise<Response<U>> => {
            const resp = await core.get<U>(data.url, {
                headers,
                signal,
                ...body,
            })
            return {
                code: resp.status,
                body: resp.data,
            }
        }
        return {
            job,
            cancel,
        }
    }

    const post = <T, U>(data: RequestConfiguration<T>): Job<U> => {
        const body = data.body || {}
        const headers = data.headers || {}
        const { signal, cancel } = abortControllerBuilder()
        const job = async (): Promise<Response<U>> => {
            const resp = await core.post<U>(data.url, {
                headers,
                signal,
                ...body,
            })
            return {
                code: resp.status,
                body: resp.data,
            }
        }
        return {
            job,
            cancel,
        }
    }

    const put = <T, U>(data: RequestConfiguration<T>): Job<U> => {
        const body = data.body || {}
        const headers = data.headers || {}
        const { signal, cancel } = abortControllerBuilder()
        const job = async (): Promise<Response<U>> => {
            const resp = await core.put<U>(data.url, {
                headers,
                signal,
                ...body,
            })
            return {
                code: resp.status,
                body: resp.data,
            }
        }
        return {
            job,
            cancel,
        }
    }

    const deleteReq = <T, U>(data: RequestConfiguration<T>): Job<U> => {
        const body = data.body || {}
        const headers = data.headers || {}
        const { signal, cancel } = abortControllerBuilder()
        const job = async (): Promise<Response<U>> => {
            const resp = await core.delete<U>(data.url, {
                headers,
                signal,
                ...body,
            })
            return {
                code: resp.status,
                body: resp.data,
            }
        }
        return {
            job,
            cancel,
        }
    }

    return {
        get,
        post,
        put,
        delete: deleteReq,
    }
}
