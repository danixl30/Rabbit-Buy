import { Flex, SimpleGrid, Text, Title } from '@mantine/core'
import { User } from '../../../../global-state/user/types/user'

export type ChatClientItemProps = User

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
