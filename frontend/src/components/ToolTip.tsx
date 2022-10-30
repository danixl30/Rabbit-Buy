import { ReactNode } from 'react'
import { Tooltip } from '@mantine/core'

export type ToolTipProps = {
    text: string
    children: ReactNode | ReactNode[]
}

export const ToolTip = (props: ToolTipProps) => (
    <>
        <Tooltip label={props.text}>{props.children}</Tooltip>
    </>
)
