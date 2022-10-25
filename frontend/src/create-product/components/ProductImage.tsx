import { Image } from '@mantine/core'

export type ProductImageProps = {
    src: string
}

export const ProductImage = (props: ProductImageProps) => (
    <Image src={props.src} height={160} alt="Norway" />
)
