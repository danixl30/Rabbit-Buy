import { Statuses } from 'src/petition/domain/value-objects/statuses'

export type PetitionPrimitive = {
    id: string
    name: string
    price: number
    currency: string
    status: Statuses
}
