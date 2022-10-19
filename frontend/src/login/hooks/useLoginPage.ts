import { UseNavigation } from "../../core/abstractions/navigation/navigation";
import { MAIN_PAGE } from "../../main/page/route";

export const useLoginPage = (navigation: UseNavigation) => {
    const goBack = () => navigation.goTo(MAIN_PAGE)

    return{
        goBack
    }
}