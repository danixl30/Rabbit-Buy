import { NumberInput } from '@mantine/core'
import { SortDescendingNumbers } from 'tabler-icons-react'

export type ExistenceInputProps = {
    value: number
    onChange: (value: number) => void
    error?: string
}

export const ExistenceInput = (props: ExistenceInputProps) => (
    <>
        <NumberInput
            error={props.error}
            value={props.value}
            onChange={props.onChange}
            placeholder="Existence"
            min={0}
            label="Existencia"
            radius="md"
            icon={<SortDescendingNumbers size={20} />}
        />
    </>
)
