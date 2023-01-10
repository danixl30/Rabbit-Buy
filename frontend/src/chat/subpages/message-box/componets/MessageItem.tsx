import { Flex, Space, Text } from '@mantine/core'
import { MessagePresent } from '../types/message-present'

export type MessageItemPros = MessagePresent

export const MessageItem = (props: MessageItemPros) => {
    return (
        <>
            <Flex justify={props.own ? 'flex-end' : 'flex-start'}>
                {!props.own && <div style={{ width: 30 }} />}
                <div
                    style={{
                        borderRadius: '20%',
                        background: props.own ? '#1CC5FF' : '#DEDEDE',
                        padding: 15,
                    }}
                >
                    <Text>{props.body}</Text>
                </div>
                {props.own && <div style={{ width: 30 }} />}
            </Flex>
        </>
    )
}
