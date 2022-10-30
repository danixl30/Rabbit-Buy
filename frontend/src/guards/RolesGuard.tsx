import { Navigate, Outlet } from 'react-router-dom'
import { getUserContext } from '../global-state/user/get-user-context'
import { MAIN_PAGE } from '../main/page/route'

export type RolesGuardProps = {
    role: string
}

export const RolesGuard = (props: RolesGuardProps) => {
    const useState = getUserContext()

    if (useState?.user?.role !== props.role) return <Navigate to={MAIN_PAGE} />

    return <Outlet />
}
