
type HelloButtonProps = {
    onClick : () => void
}

export const HelloButton = (props : HelloButtonProps) => (
    <button onClick={props.onClick}>Hello Button</button>
)