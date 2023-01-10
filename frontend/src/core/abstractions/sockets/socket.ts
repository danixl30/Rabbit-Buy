export type UseSocket = {
    emit<T extends object>(name: string, data: T): void
    subscribeEvent<T extends object>(
        name: string,
        callback: (value: T) => void,
    ): void
    off(): void
}
