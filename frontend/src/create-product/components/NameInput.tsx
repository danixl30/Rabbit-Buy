import { TextInput } from '@mantine/core'
import { ChangeEvent } from 'react'

export type NameInputProps = {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    error?: string
}

export const NameInput = (props: NameInputProps) => (
    <>
        <TextInput
            error={props.error}
            value={props.value}
            onChange={props.onChange}
            placeholder="Name"
            label="Nombre"
        />
    </>
)
