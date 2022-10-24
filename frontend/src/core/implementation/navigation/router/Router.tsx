import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LOGIN_PAGE } from '../../../../login/page/route'
import { MAIN_PAGE } from '../../../../main/page/route'

const MainPage = lazy(() => import('../../../../main/page/Main'))
const LoginPage = lazy(() => import('../../../../login/page/Login'))
const ProductDetailPage = lazy(
    () => import('../../../../product-detail/page/ProductDetail'),
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
                    </Routes>
                </BrowserRouter>
            </Suspense>
        </>
    )
}
