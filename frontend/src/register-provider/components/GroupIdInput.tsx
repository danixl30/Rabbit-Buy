import { TextInput } from '@mantine/core'
import { ChangeEvent } from 'react'
import { BuildingStore } from 'tabler-icons-react'

export type GroupIdInputProps = {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    error?: string
}

export const GroupIdInput = (props: GroupIdInputProps) => (
    <>
        <TextInput
            error={props.error}
            value={props.value}
            onChange={props.onChange}
            placeholder="ID de afiliación"
            label="ID de afiliación"
            radius="md"
            icon={<BuildingStore size={20} strokeWidth={1} color={'#000000'} />}
        />
    </>
)
