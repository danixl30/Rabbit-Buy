export type UseNavigation = {
    goTo: (route: string) => void
    goToPopBack: (route: string) => void
    getCurrentRoute: () => string
}
