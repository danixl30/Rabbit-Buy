interface Array<T> {
    asyncForEach<U>(
        callback: (e: T, i: number, arr: T[]) => Promise<U>,
    ): Promise<void>
    asyncMap<U>(
        callback: (e: T, i: number, arr: T[]) => Promise<U>,
    ): Promise<U[]>
}

Array.prototype.asyncForEach = async function (callback) {
    await Promise.all(this.map(callback))
}

Array.prototype.asyncMap = async function (callback) {
    return await Promise.all(this.map(callback))
}
