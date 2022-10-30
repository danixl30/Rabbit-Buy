import axios from 'axios'
import { serialize } from 'object-to-formdata'
import { UseHttp } from '../../../abstractions/http/http'
import { RequestConfiguration } from '../../../abstractions/http/types/config/request-configuration'
import { Response } from '../../../abstractions/http/types/response/response'
import { Job } from '../../../abstractions/http/types/job/job'
import { abortControllerBuilder } from './abort-controller/abort-controller-builder'
import { RequestConfigurationFile } from '../../../abstractions/http/types/config/request-config-file'

export const useAxiosHttp = (): UseHttp => {
    const core = axios.create({
        baseURL: 'http://localhost:4000/api',
    })
    const get = <T, U>(data: RequestConfiguration<T>): Job<U> => {
        const body = data.body || {}
        const headers = data.headers || {}
        const { signal, cancel } = abortControllerBuilder()
        const job = async (): Promise<Response<U>> => {
            const resp = await core.get<U>(data.url, {
                params: data.queries || {},
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
            const resp = await core.post<U>(
                data.url,
                {
                    signal,
                    ...body,
                },
                {
                    headers,
                },
            )
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

    const upload = <T extends object, U>(
        data: RequestConfigurationFile<T>,
        onProgress: (loaded: number, total: number) => void,
    ): Job<U> => {
        const headers = data.headers || {}
        const formData = data.body ? serialize(data.body) : new FormData()
        Object.keys(data.files).forEach((key) =>
            formData.append(key, data.files[key]),
        )
        const { signal, cancel } = abortControllerBuilder()
        const config = {
            onUploadProgress: (event: ProgressEvent) => {
                onProgress(event.loaded, event.total)
            },
        }
        const job = async (): Promise<Response<U>> => {
            const resp = await core.post<U>(data.url, formData, {
                headers: {
                    ...headers,
                    'Content-Type': 'multipart/form-data',
                },
                signal,
                ...config,
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
        upload,
    }
}
