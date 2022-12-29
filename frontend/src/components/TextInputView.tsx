import { TextInput } from '@mantine/core'
import { ReactNode } from 'react'

export type TextInputViewProps = {
    value: string
    label: string
    icon?: ReactNode
}

export const TextInputView = (props: TextInputViewProps) => (
    <>
        <TextInput
            value={props.value}
            placeholder={props.label}
            label={props.label}
            radius="md"
            icon={props.icon}
        />
    </>
)
