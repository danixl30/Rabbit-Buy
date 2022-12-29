import { Button } from '@mantine/core'
import { UserPlus } from 'tabler-icons-react'

export type ChangeButtonProps = {
    onClick?: () => void
    disabled: boolean
}

export const ChangeButton = (props: ChangeButtonProps) => (
    <>
        <Button
            disabled={props.disabled}
            onClick={props.onClick}
            leftIcon={<UserPlus size={20} />}
        >
            Cambiar
        </Button>
    </>
)
