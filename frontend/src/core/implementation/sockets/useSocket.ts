import { UseSocket } from '../../abstractions/sockets/socket'
import { io } from 'socket.io-client'

export const useSocket = (url: string = ''): UseSocket => {
    const socket = io(url)

    const emit = <T extends object>(name: string, data: T) => {
        socket.emit(name, data)
    }

    const subscribeEvent = <T extends object>(
        name: string,
        callback: (data: T) => void,
    ) => {
        socket.on(name, callback)
    }

    return {
        emit,
        subscribeEvent,
    }
}
