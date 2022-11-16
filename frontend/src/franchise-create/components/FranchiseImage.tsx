import { Image } from '@mantine/core'

export type FranchiseImageProps = {
    src: string
}

export const FranchiseImage = (props: FranchiseImageProps) => (
    <Image src={props.src} height={160} alt="Norway" />
)
