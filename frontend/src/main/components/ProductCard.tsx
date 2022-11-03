import { Card, CardSection, Center } from '@mantine/core'
import { useHoverStyles } from '../../hooks/useHoverStyles'
import { Product } from '../../services/abstractions/product/types/product'
import { List } from './List'
import { ProductImage } from './ProductImage'
import { ProductNameText } from './ProductNameText'
import { ProductPrice } from './ProductPrice'

export type ProductCardProps = Product & {
    onClick: () => void
}

export const ProductCard = (props: ProductCardProps) => {
    const { classes } = useHoverStyles()
    return (
        <Card
            className={classes.hoverEffectSoft}
            onClick={props.onClick}
            shadow="sm"
            p="lg"
            radius="md"
            withBorder
        >
            <CardSection>
                <ProductImage src={props.image} />
            </CardSection>
            <List>
                <Center>
                    <ProductNameText name={props.name} />
                </Center>
                <Center>
                    <ProductPrice
                        price={props.price}
                        currency={props.currency}
                    />
                </Center>
            </List>
        </Card>
    )
}
