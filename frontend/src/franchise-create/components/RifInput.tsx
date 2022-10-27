import { TextInput } from '@mantine/core'
import { ChangeEvent } from 'react'

export type RifInputProps = {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    error?: string
}

export const RifInput = (props: RifInputProps) => (
    <>
        <TextInput
            error={props.error}
            value={props.value}
            onChange={props.onChange}
            placeholder="RIF"
            label="RIF"
            radius="md"
        />
    </>
)
