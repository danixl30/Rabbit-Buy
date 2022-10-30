import { Modal } from '@mantine/core'
import { ReactNode } from 'react'

export type ModalLayoutProps = {
    title?: string
    onClose: () => void
    opened: boolean
    children: ReactNode | ReactNode[]
}

export const ModalLayout = (props: ModalLayoutProps) => (
    <>
        <Modal
            title={props.title}
            opened={props.opened}
            onClose={props.onClose}
        >
            {props.children}
        </Modal>
    </>
)
