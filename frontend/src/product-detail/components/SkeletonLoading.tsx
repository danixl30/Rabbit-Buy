import { Center, Skeleton } from '@mantine/core'
import { Layout } from '../../components/Layout'

export const SkeletonLoading = () => {
    return (
        <>
            <Layout>
                <Center>
                    <Skeleton width={600} height={300} visible />
                </Center>
            </Layout>
        </>
    )
}
