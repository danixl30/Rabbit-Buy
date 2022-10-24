import { Card, Grid } from '@mantine/core'
import { ReactNode } from 'react'

export type ProductContainerProps = {
    children: ReactNode | ReactNode[]
}

export const ProductContainer = (props: ProductContainerProps) => (
    <>
        <Card shadow="sm" p="lg" radius="md" withBorder>
            <Grid gutter="xl">{props.children}</Grid>
        </Card>
    </>
)
