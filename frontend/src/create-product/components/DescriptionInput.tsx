import { Textarea } from '@mantine/core'
import { ChangeEvent } from 'react'

export type DescriptionInputProps = {
    value: string
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

export const DescriptionInput = (props: DescriptionInputProps) => (
    <>
        <Textarea
            value={props.value}
            onChange={props.onChange}
            minRows={2}
            maxRows={4}
            placeholder="Descripcion"
            label="Descripcion (opcional)"
            radius="md"
        />
    </>
)
