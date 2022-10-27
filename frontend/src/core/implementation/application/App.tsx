import { UserStateProvider } from '../../../global-state/user/UserContext'
import Router from '../navigation/router/Router'
import ToastContainer from '../toast/toastify/container/ToastContainer'

export default function App() {
    return (
        <>
            <UserStateProvider>
                <ToastContainer>
                    <Router />
                </ToastContainer>
            </UserStateProvider>
        </>
    )
}
