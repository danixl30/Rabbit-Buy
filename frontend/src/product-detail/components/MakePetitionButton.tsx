import { Button } from '@mantine/core'

export type MakePetitionProps = {
    disabled: boolean
    onClick: () => void
}

export const MakePetitionButton = (props: MakePetitionProps) => (
    <>
        <Button onClick={props.onClick} disabled={props.disabled}>
            Make Petition!!
        </Button>
    </>
)
