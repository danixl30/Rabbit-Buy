import { Textarea } from '@mantine/core'
import { ChangeEvent } from 'react'
import {AlignLeft} from 'tabler-icons-react'

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
            placeholder="Descripción"
            label="Descripción (opcional)"
            radius="md"
            icon={
                <AlignLeft size={20} />
            }
        />
    </>
)
