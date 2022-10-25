import { TextInput } from '@mantine/core'
import { ChangeEvent } from 'react'

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
            placeholder="Group Id"
        />
    </>
)
