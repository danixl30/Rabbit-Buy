import { Center, Input, Loader, SimpleGrid } from '@mantine/core'
import { ChangeEvent } from 'react'
import { useAxiosHttp } from '../../../core/implementation/http/axios/useAxiosHttp'
import { useCookieSession } from '../../../core/implementation/session/cookies/useCookieSession'
import { useSocket } from '../../../core/implementation/sockets/useSocket'
import { useToastToastify } from '../../../core/implementation/toast/toastify/useToastToastify'
import { User } from '../../../global-state/user/types/user'
import { useHoverStyles } from '../../../hooks/useHoverStyles'
import { useChatService } from '../../../services/implementations/chat/useChatService'
import { useUserHttp } from '../../../services/implementations/user/useUserHttp'
import { ChatClientItem } from './components/ChatClient'
import { useCreateChatByProvider } from './hooks/useCreateChatByProvider'

type CreateChatByProviderProps = {
    callback?: () => void
}

export default function CreateChatByProvider(props: CreateChatByProviderProps) {
    const { classes } = useHoverStyles()
    const { selectUser, onChangeInput, loading, text, usersFiltered } =
        useCreateChatByProvider(
            useUserHttp(useAxiosHttp()),
            useChatService(useAxiosHttp(), useSocket()),
            useCookieSession(),
            useToastToastify(),
            props.callback,
        )

    const onSelectItem = (e: User) => () => selectUser(e)

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
                {usersFiltered.map((e) => (
                    <div
                        key={e.id}
                        onClick={onSelectItem(e)}
                        className={classes.hoverEffectSoft}
                        style={{ padding: 10 }}
                    >
                        <ChatClientItem {...e} />
                    </div>
                ))}
            </SimpleGrid>
        </>
    )
}
