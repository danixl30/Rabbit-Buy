import { PasswordInput as Password } from '@mantine/core'
import { ChangeEvent } from 'react'

export type PasswordInputProps = {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
}

export const PasswordInput = (props: PasswordInputProps) => (
    <>
        <Password
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder || 'Password'}
        />
    </>
)
