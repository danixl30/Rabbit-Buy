import {
    useNavigate,
    useLocation,
    useSearchParams,
    useParams,
} from 'react-router-dom'
import { UseNavigation } from '../../abstractions/navigation/navigation'

export const useRouterDomNavigation = (): UseNavigation => {
    const navigation = useNavigate()
    const location = useLocation()
    const [searchParams] = useSearchParams()
    const params = useParams()

    const goTo = (route: string) => {
        navigation(route)
    }

    const goToPopBack = (route: string) => {
        navigation(route, { replace: true })
    }

    const getCurrentRoute = (): string => location.pathname

    const getQuery = (key: string) => searchParams.get(key)

    const getParam = (key: string): string => params[key] || ''

    return {
        goTo,
        goToPopBack,
        getCurrentRoute,
        getQuery,
        getParam,
    }
}
