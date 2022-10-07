import { Statuses } from 'src/petition/domain/value-objects/statuses'

export type ChangePetitionStatusDTO = {
    id: string
    status: Statuses
}
