import { Button } from '@mantine/core'

export type CreateButtonProps = {
    onClick?: () => void
    disabled: boolean
}

export const CreateButton = (props: CreateButtonProps) => (
    <>
        <Button disabled={props.disabled} onClick={props.onClick}>
            Crear
        </Button>
    </>
)
