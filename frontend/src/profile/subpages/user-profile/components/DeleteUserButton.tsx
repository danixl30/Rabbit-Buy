import { Button } from '@mantine/core'
import { UserPlus } from 'tabler-icons-react'

export type DeleteUserButtonProps = {
    onClick?: () => void
    disabled: boolean
}

export const DeleteUserButton = (props: DeleteUserButtonProps) => (
    <>
        <Button
            disabled={props.disabled}
            onClick={props.onClick}
            leftIcon={<UserPlus size={20} />}
        >
            Borrar usuario
        </Button>
    </>
)
