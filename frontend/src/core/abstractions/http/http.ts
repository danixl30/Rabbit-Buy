import { RequestConfiguration } from './types/config/request-configuration'
import { Job } from './types/job/job'

export type UseHttp = {
    get: <T, U>(data: RequestConfiguration<T>) => Job<U>
    post: <T, U>(data: RequestConfiguration<T>) => Job<U>
    put: <T, U>(data: RequestConfiguration<T>) => Job<U>
    delete: <T, U>(data: RequestConfiguration<T>) => Job<U>
}
