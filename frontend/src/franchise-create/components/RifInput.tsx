import { TextInput } from '@mantine/core'
import { ChangeEvent } from 'react'
import { Notes } from 'tabler-icons-react'

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
            icon={
                <Notes size={20} strokeWidth={0.5} color={'#000000'} />
            }
        />
    </>
)
