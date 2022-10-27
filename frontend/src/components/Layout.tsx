import { ReactNode } from 'react'
import { useRouterDomNavigation } from '../core/implementation/navigation/navigation-router-dom'
import { getUserContext } from '../global-state/user/get-user-context'
import { NavBar } from './NavBar'

export type LayoutProps = {
    children: ReactNode | ReactNode[]
}

export const Layout = (props: LayoutProps) => {
    const userState = getUserContext()
    const navigation = useRouterDomNavigation()
    return (
        <>
            <NavBar navigation={navigation} userState={userState!!}>
                {props.children}
            </NavBar>
        </>
    )
}
