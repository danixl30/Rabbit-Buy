import { Button } from '@mantine/core'
import { ArrowsExchange2 } from 'tabler-icons-react'

export type ChangeButtonProps = {
    onClick?: () => void
    disabled: boolean
}

export const ChangeButton = (props: ChangeButtonProps) => (
    <>
        <Button
            disabled={props.disabled}
            onClick={props.onClick}
            leftIcon={<ArrowsExchange2 size={20} />}
        >
            Cambiar
        </Button>
    </>
)
