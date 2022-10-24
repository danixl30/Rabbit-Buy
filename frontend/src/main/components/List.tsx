import { SimpleGrid } from '@mantine/core'
import { ReactNode } from 'react'

export type ListProps = {
    children: ReactNode | ReactNode[]
}

export const List = (props: ListProps) => (
    <SimpleGrid cols={1}>{props.children}</SimpleGrid>
)
