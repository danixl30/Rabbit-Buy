import { Badge } from '@mantine/core'

export type ProductPriceProps = {
    price: number
    currency: string
}

export const ProductPrice = (props: ProductPriceProps) => (
    <>
        <Badge size="xl" color="blue">
            {props.price + ' ' + props.currency}
        </Badge>
    </>
)
