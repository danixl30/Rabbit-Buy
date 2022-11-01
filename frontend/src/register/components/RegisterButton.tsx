import { Button } from '@mantine/core'
import {UserPlus} from 'tabler-icons-react'

export type RegisterButtonProps = {
    onClick?: () => void
    disabled: boolean
}

export const RegisterButton = (props: RegisterButtonProps) => (
    <>
        <Button 
            disabled={props.disabled} 
            onClick={props.onClick}
            leftIcon={
                <UserPlus size={20} />
            }
        >
            Registrar
        </Button>
    </>
)
