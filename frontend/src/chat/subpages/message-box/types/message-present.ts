import { Message } from '../../../../services/abstractions/chat/types/message'

export type MessagePresent = Message & {
    own: boolean
}
