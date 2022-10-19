import { UseNavigation } from "../../core/abstractions/navigation/navigation"
import { LOGIN_PAGE } from "../../login/page/route"

export const useMainPage = (navigation: UseNavigation) => {
    const goToLogin = () => navigation.goTo(LOGIN_PAGE)

    return {
        goToLogin
    }
}