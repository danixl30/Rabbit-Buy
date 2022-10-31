import { TextInput } from '@mantine/core'
import { ChangeEvent } from 'react'
import { BuildingStore } from 'tabler-icons-react'

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
            placeholder="Nombre de la franquisia"
            label="Nombre de la franquisia"
            radius="md"
            rightSection={
                <BuildingStore size={20} strokeWidth={0.5} color={'#000000'} />
            }
        />
    </>
)
