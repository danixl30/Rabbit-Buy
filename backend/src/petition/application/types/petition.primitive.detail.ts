import { PetitionPrimitive } from './petition.primitive'

export type PetitionPrimitiveDetail = PetitionPrimitive & {
    franchise: {
        name: string
        id: string
    }
    client: {
        name: string
        email: string
    }
    date: Date
}
