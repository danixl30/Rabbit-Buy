import { Center as CenterE } from '@mantine/core'
import { ReactNode } from 'react'

export type CenterProps = {
    children: ReactNode | ReactNode[]
}

export const Center = (props: CenterProps) => (
    <CenterE>{props.children}</CenterE>
)
