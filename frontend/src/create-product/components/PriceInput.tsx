import { NumberInput } from '@mantine/core'
import { CreditCard } from 'tabler-icons-react'

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
            icon={<CreditCard size={20} />}
        />
    </>
)
