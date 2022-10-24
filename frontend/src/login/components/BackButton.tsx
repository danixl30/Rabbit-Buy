type BackButtonProps = {
    onclick: () => void
}

export const BackButton = (props: BackButtonProps) => (
    <button onClick={props.onclick}>Back page</button>
)
