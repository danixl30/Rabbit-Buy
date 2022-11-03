import { Badge, SimpleGrid, Text } from '@mantine/core'

export type ProductPriceProps = {
    currency: string
    price: number
}

export const ProductPrice = (props: ProductPriceProps) => (
    <>
        <SimpleGrid cols={1}>
            <Badge size="xl">{props.price + ' ' + props.currency}</Badge>
        </SimpleGrid>
    </>
)
