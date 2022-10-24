import { Optional } from '../../../utils/types/optional'

export type UseNavigation = {
    goTo: (route: string) => void
    goToPopBack: (route: string) => void
    getCurrentRoute: () => string
    getQuery: (key: string) => Optional<string>
    getParam: (key: string) => string
}
