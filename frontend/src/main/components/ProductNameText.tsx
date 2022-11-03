import { Text } from '@mantine/core'

export type ProductNameTextProps = {
    name: string
}

export const ProductNameText = (props: ProductNameTextProps) => (
    <Text size={30} weight={500}>
        {props.name}
    </Text>
)
