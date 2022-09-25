import { ToastContainer as ToastifyContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainerProps } from './props/container-props'

export default function ToastContainer(props: ToastContainerProps) {
    return (
        <>
            {props.children}
            <ToastifyContainer closeOnClick />
        </>
    )
}
