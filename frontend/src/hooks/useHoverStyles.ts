import { createStyles } from '@mantine/core'

export const useHoverStyles = createStyles((theme) => ({
    titleButton: {
        '&:hover': {
            borderRadius: '10px',
            backgroundColor: theme.colors.gray[1],
        },
    },
}))
