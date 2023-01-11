import {
    ActionIcon,
    Button,
    Card,
    Center,
    Flex,
    ScrollArea,
    SimpleGrid,
    Text,
    TextInput,
    Title,
} from '@mantine/core'
import { ChangeEvent, useEffect, useRef } from 'react'
import { Send } from 'tabler-icons-react'
import { useAxiosHttp } from '../../../core/implementation/http/axios/useAxiosHttp'
import { useCookieSession } from '../../../core/implementation/session/cookies/useCookieSession'
import { useSocket } from '../../../core/implementation/sockets/useSocket'
import { useToastToastify } from '../../../core/implementation/toast/toastify/useToastToastify'
import { getUserContext } from '../../../global-state/user/get-user-context'
import { ChatClient } from '../../../services/abstractions/chat/types/chat-client'
import { ChatProvider } from '../../../services/abstractions/chat/types/chat-provider'
import { useChatService } from '../../../services/implementations/chat/useChatService'
import { MessageItem } from './componets/MessageItem'
import { useMessageBox } from './hooks/useMessageBox'

type MessageBoxProps = {
    chat: ChatClient | ChatProvider
}

export default function MessageBox(props: MessageBoxProps) {
    const user = getUserContext()!!.user!!
    const scrollRef = useRef<HTMLDivElement>(null)
    const {
        typing,
        messages,
        incrementPage,
        onChangeInput,
        loading,
        body,
        sendMessage,
        isTop,
    } = useMessageBox(
        props.chat,
        useChatService(useAxiosHttp(), useSocket('//localhost:80')),
        user,
        useCookieSession(),
        useToastToastify(),
    )

    const onChangeMessageInput = (e: ChangeEvent<HTMLInputElement>) =>
        onChangeInput(e.target.value)

    const title =
        user.role === 'USER'
            ? (props.chat as ChatClient).franchiseName
            : (props.chat as ChatProvider).username

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
        <>
            <SimpleGrid cols={1}>
                <Center>
                    <Card>
                        <Title>{title}</Title>
                        {typing && (
                            <Text>{`${typing} esta escribiendo...`}</Text>
                        )}
                    </Card>
                </Center>
                <ScrollArea style={{ height: 350 }}>
                    <SimpleGrid cols={1}>
                        {!isTop && (
                            <Center>
                                <Button
                                    onClick={incrementPage}
                                    disabled={loading}
                                >
                                    Obtener mas
                                </Button>
                            </Center>
                        )}
                        {messages.map((message) => (
                            <MessageItem {...message} />
                        ))}
                        <div ref={scrollRef} />
                    </SimpleGrid>
                </ScrollArea>
                <Flex justify="space-between">
                    <TextInput
                        placeholder="Mensage"
                        onChange={onChangeMessageInput}
                        value={body}
                    />
                    <ActionIcon onClick={sendMessage} size={40}>
                        <Send size={40} />
                    </ActionIcon>
                </Flex>
            </SimpleGrid>
        </>
    )
}
