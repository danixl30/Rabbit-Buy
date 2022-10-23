interface Number {
    nextInt(): number
}

Number.prototype.nextInt = function () {
    return Math.ceil(this)
}
