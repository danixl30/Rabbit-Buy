import { Button } from '@mantine/core'

export type MakePetitionProps = {
    disabled: boolean
}

export const MakePetitionButton = (props: MakePetitionProps) => (
    <>
        <Button disabled={props.disabled}>Make Petition!!</Button>
    </>
)
