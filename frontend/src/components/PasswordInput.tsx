import { PasswordInput as Password } from '@mantine/core'
import { ChangeEvent } from 'react'
import { ShieldLock } from 'tabler-icons-react'

export type PasswordInputProps = {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    description?: string
    error?: string
}

export const PasswordInput = (props: PasswordInputProps) => (
    <>
        <Password
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder || 'Contraseña'}
            label={props.placeholder || 'Contraseña'}
            description={props.description}
            radius="md"
            error={props.error}
            icon={<ShieldLock size={20} />}
        />
    </>
)
