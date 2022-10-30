import { Button } from '@mantine/core'

export type LoginButtonProps = {
    onClick: () => void
    disabled: boolean
}

export const LoginButton = (props: LoginButtonProps) => (
    <>
        <Button
            color="orange"
            styles={(theme) => ({
                root: {
                    backgroundColor: '#f57c00',
                    border: 0,
                    height: 30,
                    paddingLeft: 20,
                    paddingRight: 20,

                    '&:hover': {
                        backgroundColor: theme.fn.darken('#f57c00', 0.05),
                    },
                },
            })}
            disabled={props.disabled}
            onClick={props.onClick}
        >
            Login
        </Button>
    </>
)
