interface String {
    isEmpty(): boolean
    isNotEmpty(): boolean
}

String.prototype.isEmpty = function (): boolean {
    return this.length === 0
}

String.prototype.isNotEmpty = function (): boolean {
    return this.length !== 0
}
