import { Grid } from '@mantine/core'
import { ReactNode } from 'react'

export type ItemProps = {
    children: ReactNode | ReactNode[]
    span: number
}

export const Item = (props: ItemProps) => (
    <>
        <Grid.Col span={props.span || 0}>{props.children}</Grid.Col>
    </>
)
