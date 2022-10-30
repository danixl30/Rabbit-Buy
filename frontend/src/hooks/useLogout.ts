import { UseNavigation } from '../core/abstractions/navigation/navigation'
import { UseSession } from '../core/abstractions/session/session'
import { UserState } from '../global-state/user/UserContext'
import { MAIN_PAGE } from '../main/page/route'

export const useLogout =
    (session: UseSession, state: UserState, navigation: UseNavigation) =>
    () => {
        session.deleteSession()
        state.deleteUser()
        navigation.goTo(MAIN_PAGE)
    }
