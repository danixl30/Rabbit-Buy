import { Card, CardSection, Center, Space } from '@mantine/core'
import { Product } from '../../services/abstractions/types/product'
import { List } from './List'
import { ProductImage } from './ProductImage'
import { ProductNameText } from './ProductNameText'
import { ProductPrice } from './ProductPrice'

export type ProductCardProps = Product & {
    onClick: () => void
}

export const ProductCard = (props: ProductCardProps) => (
    <Card onClick={props.onClick} shadow="sm" p="lg" radius="md" withBorder>
        <CardSection>
            <ProductImage src={props.image} />
        </CardSection>
        <List>
            <Center>
                <ProductNameText name={props.name} />
            </Center>
            <Center>
                <ProductPrice price={props.price} currency={props.currency} />
            </Center>
        </List>
    </Card>
)
