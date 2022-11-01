import { Button } from '@mantine/core'
import { Login } from 'tabler-icons-react'

export type LoginButtonProps = {
    onClick: () => void
    disabled: boolean
}

export const LoginButton = (props: LoginButtonProps) => (
    <>
        <Button
            color="orange"
            disabled={props.disabled}
            onClick={props.onClick}
            leftIcon={<Login size={20} />}
        >
            Login
        </Button>
    </>
)
