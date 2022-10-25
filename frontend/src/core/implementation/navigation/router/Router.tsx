import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CREATE_FRANCHISE } from '../../../../franchise-create/page/route'
import { LOGIN_PAGE } from '../../../../login/page/route'
import { MAIN_PAGE } from '../../../../main/page/route'
import { REGISTER_ADMIN } from '../../../../register-admin/page/route'
import { REGISTER_PROVIDER } from '../../../../register-provider/page/route'
import { REGISTER_PAGE } from '../../../../register/page/route'

const MainPage = lazy(() => import('../../../../main/page/Main'))
const LoginPage = lazy(() => import('../../../../login/page/Login'))
const ProductDetailPage = lazy(
    () => import('../../../../product-detail/page/ProductDetail'),
)
const RegisterPage = lazy(() => import('../../../../register/page/Register'))
const RegisterAdminPage = lazy(
    () => import('../../../../register-admin/page/RegisterAdmin'),
)
const RegisterProviderPage = lazy(
    () => import('../../../../register-provider/page/RegisterProvider'),
)
const CreateFranchisePage = lazy(
    () => import('../../../../franchise-create/page/CreateFranchise'),
)

export default function Router() {
    return (
        <>
            <Suspense fallback={null}>
                <BrowserRouter>
                    <Routes>
                        <Route path={MAIN_PAGE} element={<MainPage />} />
                        <Route path={LOGIN_PAGE} element={<LoginPage />} />
                        <Route
                            path="/detail/:id"
                            element={<ProductDetailPage />}
                        />
                        <Route
                            path={REGISTER_PAGE}
                            element={<RegisterPage />}
                        />
                        <Route
                            path={REGISTER_ADMIN}
                            element={<RegisterAdminPage />}
                        />
                        <Route
                            path={REGISTER_PROVIDER}
                            element={<RegisterProviderPage />}
                        />
                        <Route
                            path={CREATE_FRANCHISE}
                            element={<CreateFranchisePage />}
                        />
                    </Routes>
                </BrowserRouter>
            </Suspense>
        </>
    )
}
