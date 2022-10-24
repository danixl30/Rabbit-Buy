import { Text } from '@mantine/core'

export type ProductDescriptionProps = {
    text: string
}

export const ProductDescription = (props: ProductDescriptionProps) => (
    <>
        <Text>{props.text}</Text>
    </>
)
