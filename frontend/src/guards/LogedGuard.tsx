import { Navigate, Outlet } from 'react-router-dom'
import { getUserContext } from '../global-state/user/get-user-context'
import { MAIN_PAGE } from '../main/page/route'

export const LogedGuard = () => {
    const useState = getUserContext()
    if (!useState?.user) return <Navigate to={MAIN_PAGE} />
    return <Outlet />
}
