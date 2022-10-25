import { Button } from '@mantine/core'

export type LoginButtonProps = {
    onClick: () => void
    disabled: boolean
}

export const LoginButton = (props: LoginButtonProps) => (
    <>
        <Button disabled={props.disabled} onClick={props.onClick}>
            Login
        </Button>
    </>
)
