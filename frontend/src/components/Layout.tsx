import { ReactNode, useEffect } from 'react'
import { useAxiosHttp } from '../core/implementation/http/axios/useAxiosHttp'
import { useRouterDomNavigation } from '../core/implementation/navigation/navigation-router-dom'
import { useCookieSession } from '../core/implementation/session/cookies/useCookieSession'
import { getUserContext } from '../global-state/user/get-user-context'
import { AuthGuard } from '../guards/AuthGuard'
import { useUserHttp } from '../services/implementations/user/useUserHttp'
import { NavBar } from './NavBar'

export type LayoutProps = {
    children: ReactNode | ReactNode[]
}

export const Layout = (props: LayoutProps) => {
    const userState = getUserContext()
    const navigation = useRouterDomNavigation()
    const guard = AuthGuard(
        userState!!,
        useUserHttp(useAxiosHttp()),
        useCookieSession(),
        navigation,
    )
    useEffect(() => {
        guard()
    }, [navigation.getCurrentRoute()])
    return (
        <>
            <NavBar navigation={navigation} userState={userState!!}>
                {props.children}
            </NavBar>
        </>
    )
}
