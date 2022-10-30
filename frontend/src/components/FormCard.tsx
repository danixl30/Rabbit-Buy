import { Card } from '@mantine/core'
import { ReactNode } from 'react'

export type FormCardProps = {
    children: ReactNode | ReactNode[]
}

export const FormCard = (props: FormCardProps) => (
    <>
        <Card shadow="sm" pr={100} pl={100} pb={30} radius="md" withBorder>
            {props.children}
        </Card>
    </>
)
