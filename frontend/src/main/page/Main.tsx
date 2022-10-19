import { useRouterDomNavigation } from "../../core/implementation/navigation/navigation-router-dom"
import HeaderMain from "../components/MainShell";
import { useMainPage } from "../hooks/useMainPage"


export default function MainPage() {
    let msg : string;
    const { goToLogin } = useMainPage(useRouterDomNavigation())
    return (
        <>
            <HeaderMain onclick = {goToLogin}></HeaderMain>
            {/* <button onClick={onClickLoginButton}>Login</button> */}
        </>
    )
}
