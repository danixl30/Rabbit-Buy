import { TextInput } from '@mantine/core'
import { ChangeEvent } from 'react'

export type CurrencyInputProps = {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    error?: string
}

export const CurrencyInput = (props: CurrencyInputProps) => (
    <>
        <TextInput
            error={props.error}
            value={props.value}
            onChange={props.onChange}
            placeholder="Currency"
            label="Currency"
        />
    </>
)
