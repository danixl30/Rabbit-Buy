export interface TokenProvider {
    sign<T extends object>(value: T): string
    verify<T extends object>(value: string): T
}
