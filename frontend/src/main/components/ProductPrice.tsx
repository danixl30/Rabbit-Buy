import { Badge } from '@mantine/core'

export type ProductPriceProps = {
    price: number
    currency: string
}

export const ProductPrice = (props: ProductPriceProps) => (
    <>
        <Badge color="blue">{props.price}</Badge>
        <Badge color="green">{props.currency}</Badge>
    </>
)
