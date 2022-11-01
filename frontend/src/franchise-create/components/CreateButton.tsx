import { Button } from '@mantine/core'
import {Plus} from 'tabler-icons-react'

export type CreateButtonProps = {
    onClick?: () => void
    disabled: boolean
}

export const CreateButton = (props: CreateButtonProps) => (
    <>
        <Button leftIcon={<Plus size={20} />} disabled={props.disabled} onClick={props.onClick}>
            Crear
        </Button>
    </>
)
