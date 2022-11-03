import { createStyles } from '@mantine/core'

export const useHoverStyles = createStyles((theme) => ({
    hoverEffectSoft: {
        '&:hover': {
            borderRadius: '10px',
            backgroundColor: theme.colors.gray[3],
        },
    },

    hoverEffectHard: {
        '&:hover': {
            borderRadius: '10px',
            backgroundColor: theme.colors.gray[6],
        },
    },
}))
