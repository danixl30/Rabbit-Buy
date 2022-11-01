import { TextInput } from '@mantine/core'
import { ChangeEvent } from 'react'
import { Mail } from 'tabler-icons-react'

export type EmailInputProps = {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    error?: string
}

export const EmailInput = (props: EmailInputProps) => (
    <>
        <TextInput
            error={props.error}
            value={props.value}
            onChange={props.onChange}
            placeholder="Correo"
            label="Correo"
            radius="md"
            icon={<Mail size={20} strokeWidth={1} />}
        />
    </>
)
