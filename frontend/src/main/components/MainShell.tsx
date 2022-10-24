import { AppShell } from '@mantine/core'
import { ReactNode } from 'react'

export type HeaderProps = {
    children: ReactNode | ReactNode[]
}

export default function MainShell(props: HeaderProps) {
    return (
        <AppShell navbarOffsetBreakpoint="sm" asideOffsetBreakpoint="sm">
            {props.children}
        </AppShell>
    )
}
