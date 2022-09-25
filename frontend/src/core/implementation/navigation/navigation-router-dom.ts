import { useNavigate, useLocation } from 'react-router-dom'
import { UseNavigation } from '../../abstractions/navigation/navigation'

export const useRouterDomNavigation = (): UseNavigation => {
    const navigation = useNavigate()
    const location = useLocation()

    const goTo = (route: string) => {
        navigation(route)
    }

    const goToPopBack = (route: string) => {
        navigation(route, { replace: true })
    }

    const getCurrentRoute = (): string => location.pathname

    return {
        goTo,
        goToPopBack,
        getCurrentRoute,
    }
}
