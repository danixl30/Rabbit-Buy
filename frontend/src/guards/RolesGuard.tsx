import { Navigate, Outlet } from 'react-router-dom'
import { getUserContext } from '../global-state/user/get-user-context'
import { MAIN_PAGE } from '../main/page/route'

export type RolesGuardProps = {
    role: string | string[]
}

export const RolesGuard = (props: RolesGuardProps) => {
    const useState = getUserContext()

    if (
        (!Array.isArray(props.role) && useState?.user?.role !== props.role) ||
        (Array.isArray(props.role) &&
            !props.role.find((ro) => ro === useState?.user?.role))
    )
        return <Navigate to={MAIN_PAGE} />

    return <Outlet />
}
