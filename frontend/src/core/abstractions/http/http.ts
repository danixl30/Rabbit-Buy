import { RequestConfigurationFile } from './types/config/request-config-file'
import { RequestConfiguration } from './types/config/request-configuration'
import { Job } from './types/job/job'

export type UseHttp = {
    get: <T, U>(data: RequestConfiguration<T>) => Job<U>
    post: <T, U>(data: RequestConfiguration<T>) => Job<U>
    put: <T, U>(data: RequestConfiguration<T>) => Job<U>
    delete: <T, U>(data: RequestConfiguration<T>) => Job<U>
    upload: <T, U>(
        data: RequestConfigurationFile<T>,
        onProgress: (loaded: number, total: number) => void,
    ) => Job<U>
}
