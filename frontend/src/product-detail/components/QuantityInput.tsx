import { NumberInput } from '@mantine/core'

export type QuantityInputProps = {
    quantity: number
    disabled: boolean
    value: number
    onChange: (value: number) => void
}

export const QuantityInput = (props: QuantityInputProps) => (
    <>
        <NumberInput
            disabled={props.disabled}
            label="Cantidad:"
            defaultValue={1}
            value={props.value}
            onChange={props.onChange}
            max={props.quantity}
            min={1}
        />
    </>
)
