import { Text } from '@mantine/core'
import { ComponentPropsWithoutRef, forwardRef } from 'react'

export interface SliderItemProps extends ComponentPropsWithoutRef<'div'> {
    label: string
    onClick: () => void | Promise<void>
}

export const SliderItem = forwardRef<HTMLDivElement, SliderItemProps>(
    (props: SliderItemProps, ref) => {
        const { label, onClick, ...others } = props
        return (
            <div onClick={onClick} ref={ref} {...others}>
                <Text size="sm">{label}</Text>
            </div>
        )
    },
)
