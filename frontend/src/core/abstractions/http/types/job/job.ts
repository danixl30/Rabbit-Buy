import { Response } from '../response/response'

export type Job<T> = {
    cancel: () => void
    job: () => Promise<Response<T>>
}
