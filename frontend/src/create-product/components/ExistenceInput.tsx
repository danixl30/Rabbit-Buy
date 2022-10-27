import { NumberInput } from '@mantine/core'

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
        />
    </>
)
