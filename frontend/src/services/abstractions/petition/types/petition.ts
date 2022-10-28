export type Petition = {
    id: string
    name: string
    quantity: number
    price: number
    status: string
    currency: string
    client?: {
        name: string
        email: string
    }
}
