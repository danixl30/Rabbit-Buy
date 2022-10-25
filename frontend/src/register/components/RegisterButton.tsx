import { Button } from '@mantine/core'

export type RegisterButtonProps = {
    onClick?: () => void
    disabled: boolean
}

export const RegisterButton = (props: RegisterButtonProps) => (
    <>
        <Button disabled={props.disabled} onClick={props.onClick}>
            Register
        </Button>
    </>
)
