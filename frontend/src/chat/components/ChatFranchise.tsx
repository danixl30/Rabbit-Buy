import { Avatar, Flex, SimpleGrid, Text, Title } from '@mantine/core'
import { ChatClient } from '../../services/abstractions/chat/types/chat-client'

export type ChatFranchiseItemProps = ChatClient

export const ChatFranchiseItem = (props: ChatFranchiseItemProps) => {
    return (
        <>
            <Flex gap={20}>
                <Avatar src={props.image} size={60} />
                <SimpleGrid cols={1} spacing={1}>
                    <Title order={5}>{props.franchiseName}</Title>
                    <Text>{props.id}</Text>
                </SimpleGrid>
            </Flex>
        </>
    )
}
