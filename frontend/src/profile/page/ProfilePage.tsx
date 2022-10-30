 import { lazy, useState, Suspense } from 'react'
import { Center, Collapse, SimpleGrid } from '@mantine/core'
import { Layout } from '../../components/Layout'
import { ConfigTitle } from '../components/ConfigTitle'
import { PetitionRequestCard } from '../components/PetitionsRequestCard'
import { ProfileConfigCard } from '../components/ProfileConfigCard'
import { getUserContext } from '../../global-state/user/get-user-context'
import { CreateFranchiseCard } from '../components/CreateFranchise'
import { CreateProductCard } from '../components/CreateProductCard'
import { useRouterDomNavigation } from '../../core/implementation/navigation/navigation-router-dom'
import { CREATE_FRANCHISE } from '../../franchise-create/page/route'
import { CREATE_PRODUCT } from '../../create-product/page/route'

const UserProfile = lazy(() => import('../subpages/user-profile/UserProfile'))
const PetitionConsult = lazy(
    () => import('../subpages/petitions/PetitionsConsult'),
)

const PROFILE_CONFIG = 'PROFILE_CONFIG'
const PETITION_CONSULT = 'PETITION_CONSULT'

export default function ProfilePage() {
    const navigation = useRouterDomNavigation()
    const [subPage, setSubPage] = useState('')
    const onClickItem = (sub: string) => () => setSubPage(sub)
    const state = getUserContext()
    const onClickLink = (route: string) => () => navigation.goTo(route)
    return (
        <>
            <Layout>
                <Center>
                    <SimpleGrid cols={1}>
                        <Center>
                            <ConfigTitle />
                        </Center>
                        <SimpleGrid cols={2}>
                            {state?.user?.role !== 'ADMIN' && (
                                <PetitionRequestCard
                                    onClick={onClickItem(PETITION_CONSULT)}
                                />
                            )}
                            {state?.user?.role === 'ADMIN' && (
                                <CreateFranchiseCard
                                    onClick={onClickLink(CREATE_FRANCHISE)}
                                />
                            )}
                            {state?.user?.role === 'PROVIDER' && (
                                <CreateProductCard
                                    onClick={onClickLink(CREATE_PRODUCT)}
                                />
                            )}
                            <ProfileConfigCard
                                onClick={onClickItem(PROFILE_CONFIG)}
                            />
                        </SimpleGrid>
                        <Suspense fallback={null}>
                            <Collapse in={subPage === PROFILE_CONFIG}>
                                <UserProfile />
                            </Collapse>
                            <Collapse in={subPage === PETITION_CONSULT}>
                                <PetitionConsult />
                            </Collapse>
                        </Suspense>
                    </SimpleGrid>
                </Center>
            </Layout>
        </>
    )
}
