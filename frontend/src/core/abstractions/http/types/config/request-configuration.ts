import { Dicctionary } from '../../../../../utils/types/dicctionary'

export type RequestConfiguration<T> = {
    url: string
    body?: T
    params?: string[]
    headers?: Dicctionary<string>
}
