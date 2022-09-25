import Router from '../navigation/router/Router'
import ToastContainer from '../toast/toastify/container/ToastContainer'

export default function App() {
    return (
        <>
            <ToastContainer>
                <Router />
            </ToastContainer>
        </>
    )
}
