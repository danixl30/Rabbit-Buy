import { useRouterDomNavigation } from "../../core/implementation/navigation/navigation-router-dom"
import { BackButton } from "../components/BackButton"
import { useLoginPage } from "../hooks/useLoginPage"
import { HelloButton } from "../components/HelloButton"

export default function LoginPage() {
    const {goBack} = useLoginPage(useRouterDomNavigation())
    return (
        <>
            <BackButton onclick={goBack}/>
            <h3>hola man</h3>
            <section >
                <h3>hola perro</h3>
            </section>
            <h1>Login Page</h1>
        </>
    )
}