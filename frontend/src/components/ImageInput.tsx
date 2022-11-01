import { FileInput } from '@mantine/core'
import {Photo} from 'tabler-icons-react'
import { Optional } from '../utils/types/optional'

export type ImageInputProps = {
    onChange: (e: Optional<File>) => void
}

export const ImageInput = (props: ImageInputProps) => (
    <>
        <FileInput
            onChange={props.onChange}
            placeholder="Imagen"
            accept="image/png,image/jpeg"
            icon={
                <Photo size={20} />
            }
        />
    </>
)
