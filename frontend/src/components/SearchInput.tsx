import { ChangeEvent, KeyboardEvent } from 'react'
import { ActionIcon, Avatar, Input } from '@mantine/core'

export type SearchInputProps = {
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    value?: string
    submit?: () => void
}

export const SearchInput = (props: SearchInputProps) => {
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') props.submit?.()
    }

    return (
        <>
            <Input
                onKeyPress={onKeyPress}
                value={props.value}
                placeholder="Buscar"
                onChange={props.onChange}
                radius="md"
                rightSection={
                    <ActionIcon onClick={props.submit}>
                        <Avatar size={16} />
                    </ActionIcon>
                }
            />
        </>
    )
}
