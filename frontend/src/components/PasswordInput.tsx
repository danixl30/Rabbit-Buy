import { PasswordInput as Password } from '@mantine/core'
import { ChangeEvent } from 'react'

export type PasswordInputProps = {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    description? : string
    error?: string
}

export const PasswordInput = (props: PasswordInputProps) => (
    <>
        <Password
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder || 'Password'}
            label={props.placeholder || 'Password'}
            description = {props.description}
            radius="md"
            error={props.error}
        />
    </>
)
