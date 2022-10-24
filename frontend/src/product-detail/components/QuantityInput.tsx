import { NumberInput } from '@mantine/core'

export type QuantityInputProps = {
    quantity: number
    disabled: boolean
}

export const QuantityInput = (props: QuantityInputProps) => (
    <>
        <NumberInput
            disabled={props.disabled}
            label="Cantidad:"
            defaultValue={1}
            max={props.quantity}
            min={1}
        />
    </>
)
