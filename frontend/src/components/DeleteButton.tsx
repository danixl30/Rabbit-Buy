import { Button } from '@mantine/core'
import { Trash } from 'tabler-icons-react'

export type DeleteButtonProps = {
    onClick?: () => void | Promise<void>
}

export const DeleteButton = (props: DeleteButtonProps) => {
    return (
        <>
            <Button onClick={props.onClick} leftIcon={<Trash />}>
                Borrar
            </Button>
        </>
    )
}
