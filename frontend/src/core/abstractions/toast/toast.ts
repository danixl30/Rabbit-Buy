import { Pending } from './types/pending'

export type UseToast = {
    success: (text: string) => void
    info: (text: string) => void
    warning: (text: string) => void
    error: (text: string) => void
    pending: (text: string) => Pending
}
