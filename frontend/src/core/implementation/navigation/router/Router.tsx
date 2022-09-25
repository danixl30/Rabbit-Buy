import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MAIN_PAGE } from '../../../../main/page/route'

const MainPage = lazy(() => import('../../../../main/page/Main'))

export default function Router() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={MAIN_PAGE} element={<MainPage />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
