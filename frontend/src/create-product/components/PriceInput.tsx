import { NumberInput } from '@mantine/core'

export type PriceInputProps = {
    value: number
    onChange: (value: number) => void
    error?: string
}

export const PriceInput = (props: PriceInputProps) => (
    <>
        <NumberInput
            type="number"
            error={props.error}
            value={props.value}
            onChange={props.onChange}
            placeholder=""
            label="Precio"
            radius="md"
            min={0}
        />
    </>
)
