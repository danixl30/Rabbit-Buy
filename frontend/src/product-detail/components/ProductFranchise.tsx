import { Title } from '@mantine/core'

export type ProductFranchiseProps = {
    name: string
}

export const ProductFranchise = (props: ProductFranchiseProps) => (
    <Title order={4}>{'Por: ' + props.name}</Title>
)
