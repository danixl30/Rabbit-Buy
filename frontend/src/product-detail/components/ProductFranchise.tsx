import { Title } from '@mantine/core'

export type ProductFranchiseProps = {
    name: string
}

export const ProductFranchise = (props: ProductFranchiseProps) => (
    <Title order={4}>{'By: ' + props.name}</Title>
)
