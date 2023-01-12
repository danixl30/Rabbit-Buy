import {
    Card,
    Grid,
    Stack,
    Flex,
    Title,
    ActionIcon,
    TextInput,
    Center,
    SimpleGrid,
    Text,
    ScrollArea,
    Tooltip,
    Loader,
} from '@mantine/core'
import { lazy, Suspense } from 'react'
import { SquarePlus } from 'tabler-icons-react'
import { Layout } from '../../components/Layout'
import { ModalLayout } from '../../components/ModalLayout'
import { useAxiosHttp } from '../../core/implementation/http/axios/useAxiosHttp'
import { useCookieSession } from '../../core/implementation/session/cookies/useCookieSession'
import { useSocket } from '../../core/implementation/sockets/useSocket'
import { useToastToastify } from '../../core/implementation/toast/toastify/useToastToastify'
import { getUserContext } from '../../global-state/user/get-user-context'
import { useHoverStyles } from '../../hooks/useHoverStyles'
import { useChatService } from '../../services/implementations/chat/useChatService'
import { ChatClientItem } from '../components/ChatClient'
import { ChatFranchiseItem } from '../components/ChatFranchise'
import { useChat } from '../hooks/useChat'

const CreateChatByClient = lazy(
    () => import('../subpages/create-client/CreateChatByClient'),
)
const CreateChatByProvider = lazy(
    () => import('../subpages/create-provider/CreateChatByProvider'),
)
const MessageBox = lazy(() => import('../subpages/message-box/MessageBox'))

export default function ChatPage() {
    const user = getUserContext()?.user!!
    const { classes } = useHoverStyles()
    const {
        chatsClient,
        chatsProvider,
        loading,
        openAddChat,
        onCloseAddChat,
        selectChat,
        openAddChatHandler,
        chatSelected,
    } = useChat(
        useChatService(useAxiosHttp(), useSocket()),
        user,
        useCookieSession(),
        useToastToastify(),
    )

    if (loading) {
        return (
            <Center>
                <Loader />
            </Center>
        )
    }
    return (
        <>
            <Suspense fallback={null}>
                <ModalLayout
                    title="Añadir chat"
                    opened={openAddChat}
                    onClose={onCloseAddChat}
                >
                    {user.role === 'USER' && (
                        <CreateChatByClient callback={onCloseAddChat} />
                    )}
                    {user.role === 'PROVIDER' && (
                        <CreateChatByProvider callback={onCloseAddChat} />
                    )}
                </ModalLayout>
                <Layout>
                    <Grid grow>
                        <Grid.Col span={4}>
                            <Card shadow="sm" p="lg" radius="md" withBorder>
                                <Stack justify="flex-start">
                                    <Flex justify="flex-end" gap="xl">
                                        <Title order={1}>Chat</Title>
                                        <Tooltip label="Añadir chat">
                                            <ActionIcon
                                                onClick={openAddChatHandler}
                                                size={40}
                                            >
                                                <SquarePlus size={40} />
                                            </ActionIcon>
                                        </Tooltip>
                                    </Flex>
                                    <ScrollArea style={{ height: 435 }}>
                                        {chatsClient.length === 0 &&
                                            chatsProvider.length === 0 && (
                                                <Text>No tienes chats...</Text>
                                            )}
                                        {chatsClient.map((e) => (
                                            <div
                                                key={e.id}
                                                onClick={() => selectChat(e)}
                                                className={
                                                    classes.hoverEffectSoft
                                                }
                                                style={{ padding: 10 }}
                                            >
                                                <ChatFranchiseItem {...e} />
                                            </div>
                                        ))}
                                        {chatsProvider.map((e) => (
                                            <div
                                                key={e.id}
                                                onClick={() => selectChat(e)}
                                                className={
                                                    classes.hoverEffectSoft
                                                }
                                                style={{ padding: 10 }}
                                            >
                                                <ChatClientItem {...e} />
                                            </div>
                                        ))}
                                    </ScrollArea>
                                </Stack>
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={8}>
                            <SimpleGrid cols={1}>
                                <Card shadow="sm" p="lg" radius="md" withBorder>
                                    {!chatSelected && (
                                        <>
                                            <Center>
                                                <Text>Selecciona un chat</Text>
                                            </Center>
                                        </>
                                    )}
                                    {chatSelected && (
                                        <MessageBox chat={chatSelected} />
                                    )}
                                </Card>
                            </SimpleGrid>
                        </Grid.Col>
                    </Grid>
                </Layout>
            </Suspense>
        </>
    )
}
