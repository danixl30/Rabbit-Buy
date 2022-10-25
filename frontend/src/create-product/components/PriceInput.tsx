import { NumberInput } from '@mantine/core'

export type PriceInputProps = {
    value: number
    onChange: (value: number) => void
    error?: string
}

export const PriceInput = (props: PriceInputProps) => (
    <>
        <NumberInput
            error={props.error}
            value={props.value}
            onChange={props.onChange}
            placeholder="Price"
            label="Price"
            min={0}
            parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
            formatter={(value) =>
                !Number.isNaN(parseFloat(value || ''))
                    ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    : '$ '
            }
        />
    </>
)
