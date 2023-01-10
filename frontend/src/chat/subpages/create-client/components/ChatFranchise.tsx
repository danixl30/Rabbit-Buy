import { Avatar, Flex, SimpleGrid, Text, Title } from '@mantine/core'
import { Franchise } from '../../../../services/abstractions/franchise/types/franchise'

export type ChatFranchiseItemProps = Franchise

export const ChatFranchiseItem = (props: ChatFranchiseItemProps) => {
    return (
        <>
            <Flex gap={20}>
                <Avatar src={props.image} size={60} />
                <SimpleGrid cols={1} spacing={1}>
                    <Title order={5}>{props.name}</Title>
                    <Text>{props.rif}</Text>
                </SimpleGrid>
            </Flex>
        </>
    )
}
