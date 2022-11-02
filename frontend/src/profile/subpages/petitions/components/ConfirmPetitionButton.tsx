import { Button } from '@mantine/core'
import { Checks } from 'tabler-icons-react'

export type ConfirmPetitionButtonProps = {
    onClick: () => void
}

export const ConfirmPetitionButton = (props: ConfirmPetitionButtonProps) => {
    return (
        <>
            <Button onClick={props.onClick} leftIcon={<Checks size={20} />}>
                Confirmar pedido
            </Button>
        </>
    )
}
