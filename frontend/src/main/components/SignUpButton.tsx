import { Button } from '@mantine/core';

type SignUpButtonProps = {
    onClick : () => void
}

export const SignUpButton = (props : SignUpButtonProps) => {
    return(
        <Button onClick = {props.onClick} variant="outline" radius="xl" size="lg" compact>
        REGISTRARSE
        </Button>
    );
}