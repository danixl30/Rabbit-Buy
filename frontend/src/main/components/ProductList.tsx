import { SimpleGrid } from '@mantine/core'
import { ReactNode } from 'react'

export type ProductListProps = {
    children: ReactNode | ReactNode[]
}

export const ProductList = (props: ProductListProps) => (
    <SimpleGrid cols={2}>{props.children}</SimpleGrid>
)
