import { Center, SimpleGrid, Skeleton } from '@mantine/core'
import { Layout } from '../../components/Layout'
import { List } from './List'

export const SkeletonLoading = () => {
    return (
        <>
            <Layout>
                <Center>
                    <List>
                        <SimpleGrid cols={2}>
                            {[...Array(10)].map(() => (
                                <Skeleton height={300} width={250} visible />
                            ))}
                        </SimpleGrid>
                    </List>
                </Center>
            </Layout>
        </>
    )
}
