import { SimpleGrid, Text } from '@mantine/core'

export type ProductPriceProps = {
    currency: string
    price: number
}

export const ProductPrice = (props: ProductPriceProps) => (
    <>
        <SimpleGrid cols={1}>
            <Text>{'Price: ' + props.price + ' ' + props.currency}</Text>
        </SimpleGrid>
    </>
)