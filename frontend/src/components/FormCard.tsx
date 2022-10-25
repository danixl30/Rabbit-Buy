import { Card } from '@mantine/core'
import { ReactNode } from 'react'

export type FormCardProps = {
    children: ReactNode | ReactNode[]
}

export const FormCard = (props: FormCardProps) => (
    <>
        <Card shadow="sm" p="lg" radius="md" withBorder>
            {props.children}
        </Card>
    </>
)
