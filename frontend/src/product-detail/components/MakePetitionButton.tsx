import { Button } from '@mantine/core'
import { ShoppingCartPlus } from 'tabler-icons-react'

export type MakePetitionProps = {
    disabled: boolean
    onClick: () => void
}

export const MakePetitionButton = (props: MakePetitionProps) => (
    <>
        <Button
            leftIcon={<ShoppingCartPlus size={20} />}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            Realizar pedido!!
        </Button>
    </>
)
