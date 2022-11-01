import { TextInput } from '@mantine/core'
import { ChangeEvent } from 'react'
import { ShoppingCart } from 'tabler-icons-react'

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
            placeholder="Nombre"
            label="Nombre"
            radius="md"
            icon={<ShoppingCart size={20} />}
        />
    </>
)
