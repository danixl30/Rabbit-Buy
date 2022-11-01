import { Button, Center, SimpleGrid, Text } from '@mantine/core'
import { Refresh } from 'tabler-icons-react'

export const ErrorComponent = () => {
    const onClickReload = () => location.reload()
    return (
        <>
            <SimpleGrid cols={1}>
                <Center>
                    <Text>
                        Ha ocurrido un error, por favor refresque la pagina
                    </Text>
                </Center>
                <Center>
                    <Button
                        onClick={onClickReload}
                        leftIcon={<Refresh size={20} />}
                    >
                        Refrescar
                    </Button>
                </Center>
            </SimpleGrid>
        </>
    )
}
