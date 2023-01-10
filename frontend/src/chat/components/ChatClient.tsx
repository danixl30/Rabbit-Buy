import { Flex, SimpleGrid, Text, Title } from '@mantine/core'
import { ChatProvider } from '../../services/abstractions/chat/types/chat-provider'

export type ChatClientItemProps = ChatProvider

export const ChatClientItem = (props: ChatClientItemProps) => {
    return (
        <>
            <Flex>
                <SimpleGrid cols={1} spacing={1}>
                    <Title order={5}>{props.username}</Title>
                    <Text>{props.email}</Text>
                </SimpleGrid>
            </Flex>
        </>
    )
}
