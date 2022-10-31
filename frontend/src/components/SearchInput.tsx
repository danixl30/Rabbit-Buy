import { ChangeEvent, KeyboardEvent } from 'react'
import { ActionIcon, Input } from '@mantine/core'
import { Search } from 'tabler-icons-react'

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
                        <Search size={48} strokeWidth={0.5} color={'black'} />
                    </ActionIcon>
                }
            />
        </>
    )
}
