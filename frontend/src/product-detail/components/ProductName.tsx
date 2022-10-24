import { Title } from '@mantine/core'

export type ProductNameProps = {
    text: string
}

export const ProductName = (props: ProductNameProps) => (
    <>
        <Title order={2}>{props.text}</Title>
    </>
)
