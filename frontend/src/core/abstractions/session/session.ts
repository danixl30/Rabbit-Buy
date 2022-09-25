import { Optional } from '../../../utils/types/optional'

export type UseSession = {
    getSession: () => Optional<string>
    createSession: (data: string) => void
    deleteSession: () => void
}
