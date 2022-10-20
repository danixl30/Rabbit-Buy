import { useRouterDomNavigation } from "../../core/implementation/navigation/navigation-router-dom"
import HeaderMain from "../components/MainShell";
import { useMainPage } from "../hooks/useMainPage"


export default function MainPage() {
    const { goToLogin } = useMainPage(useRouterDomNavigation())
    return (
        <>
            <HeaderMain onclick={goToLogin}></HeaderMain>
        </>
    )
}
