import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CREATE_PRODUCT } from '../../../../create-product/page/route'
import { CREATE_FRANCHISE } from '../../../../franchise-create/page/route'
import { LogedGuard } from '../../../../guards/LogedGuard'
import { NotLogedGuard } from '../../../../guards/NotLogedGuard'
import { RolesGuard } from '../../../../guards/RolesGuard'
import { LOGIN_PAGE } from '../../../../login/page/route'
import { MAIN_PAGE } from '../../../../main/page/route'
import { PROFILE_PAGE } from '../../../../profile/page/route'
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
const CreateProduct = lazy(
    () => import('../../../../create-product/page/CreateProduct'),
)
const ProfilePage = lazy(() => import('../../../../profile/page/ProfilePage'))

export default function Router() {
    return (
        <>
            <Suspense fallback={null}>
                <BrowserRouter>
                    <Routes>
                        <Route path={MAIN_PAGE} element={<MainPage />} />
                        <Route
                            path="/detail/:id"
                            element={<ProductDetailPage />}
                        />
                        <Route element={<NotLogedGuard />}>
                            <Route path={LOGIN_PAGE} element={<LoginPage />} />
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
                        </Route>
                        <Route element={<LogedGuard />}>
                            <Route element={<RolesGuard role="ADMIN" />}>
                                <Route
                                    path={CREATE_FRANCHISE}
                                    element={<CreateFranchisePage />}
                                />
                            </Route>
                            <Route element={<RolesGuard role="PROVIDER" />}>
                                <Route
                                    path={CREATE_PRODUCT}
                                    element={<CreateProduct />}
                                />
                            </Route>
                            <Route
                                path={PROFILE_PAGE}
                                element={<ProfilePage />}
                            />
                        </Route>
                        <Route path="*" element={<Navigate to={MAIN_PAGE} />} />
                    </Routes>
                </BrowserRouter>
            </Suspense>
        </>
    )
}
