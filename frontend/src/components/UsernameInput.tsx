import { TextInput } from '@mantine/core'
import { ChangeEvent } from 'react'
import { User } from 'tabler-icons-react'

export type UsernameInputProps = {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    error?: string
}

export const UsernameInput = (props: UsernameInputProps) => (
    <>
        <TextInput
            error={props.error}
            value={props.value}
            onChange={props.onChange}
            placeholder="Nombre de usuario"
            label="Nombre de usuario"
            radius="md"
            icon = {<User
                size={20}
                strokeWidth={1}
                color={'#000000'}
              />} 
        />
    </>
)
