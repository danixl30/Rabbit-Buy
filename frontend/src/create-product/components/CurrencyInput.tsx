import { NativeSelect } from '@mantine/core'
import { ChangeEvent } from 'react'
import { Receipt2 } from 'tabler-icons-react'

export type CurrencyInputProps = {
    value: string
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void
    error?: string
}

export const CurrencyInput = (props: CurrencyInputProps) => (
    <>
        <NativeSelect
            error={props.error}
            value={props.value}
            onChange={props.onChange}
            placeholder="Moneda"
            data={['USD', 'Bs.']}
            label="Moneda"
            radius="md"
            icon={<Receipt2 size={20} strokeWidth={0.5} color={'#000000'} />}
        />
    </>
)
