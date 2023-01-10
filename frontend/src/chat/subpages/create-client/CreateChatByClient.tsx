import { Center, Input, Loader, SimpleGrid } from '@mantine/core'
import { ChangeEvent } from 'react'
import { useAxiosHttp } from '../../../core/implementation/http/axios/useAxiosHttp'
import { useCookieSession } from '../../../core/implementation/session/cookies/useCookieSession'
import { useSocket } from '../../../core/implementation/sockets/useSocket'
import { useToastToastify } from '../../../core/implementation/toast/toastify/useToastToastify'
import { useHoverStyles } from '../../../hooks/useHoverStyles'
import { Franchise } from '../../../services/abstractions/franchise/types/franchise'
import { useChatService } from '../../../services/implementations/chat/useChatService'
import { useFranchise } from '../../../services/implementations/franchise/useFranchise'
import { ChatFranchiseItem } from './components/ChatFranchise'
import { useCreateChatByClient } from './hooks/useCreateChatByClient'

type CreateChatByClientProps = {
    callback?: () => void
}

export default function CreateChatByClient(props: CreateChatByClientProps) {
    const { classes } = useHoverStyles()
    const { loading, text, franchiseFiltered, selectFranchise, onChangeInput } =
        useCreateChatByClient(
            useFranchise(useAxiosHttp()),
            useChatService(useAxiosHttp(), useSocket()),
            useCookieSession(),
            useToastToastify(),
            props.callback,
        )

    const onSelectItem = (e: Franchise) => () => selectFranchise(e)

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) =>
        onChangeInput(e.target.value)

    if (loading) {
        return (
            <Center>
                <Loader />
            </Center>
        )
    }

    return (
        <>
            <SimpleGrid cols={1}>
                <Input
                    value={text}
                    placeholder="Buscar..."
                    onChange={onChangeInputHandler}
                />
                {franchiseFiltered.map((e) => (
                    <div
                        key={e.id}
                        onClick={onSelectItem(e)}
                        className={classes.hoverEffectSoft}
                        style={{ padding: 10 }}
                    >
                        <ChatFranchiseItem {...e} />
                    </div>
                ))}
            </SimpleGrid>
        </>
    )
}
