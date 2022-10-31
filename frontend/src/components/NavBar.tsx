import {
    ActionIcon,
    AppShell,
    Avatar,
    Button,
    Center,
    Grid,
    Header,
    SimpleGrid,
    Space,
    Text,
    Title,
    UnstyledButton,
    createStyles
} from '@mantine/core'
import { ReactNode } from 'react'
import { UseNavigation } from '../core/abstractions/navigation/navigation'
import { useCookieSession } from '../core/implementation/session/cookies/useCookieSession'
import { UserState } from '../global-state/user/UserContext'
import { useLogout } from '../hooks/useLogout'
import { LOGIN_PAGE } from '../login/page/route'
import { MAIN_PAGE } from '../main/page/route'
import { PROFILE_PAGE } from '../profile/page/route'
import { REGISTER_PAGE } from '../register/page/route'
import { ToolTip } from './ToolTip'

export type NavBarProps = {
    children: ReactNode | ReactNode[]
    navigation: UseNavigation
    userState: UserState
}

type IconAppProps = {
    navigation: UseNavigation
}

const useStyles = createStyles((theme) => ({
    titleButton: {
        '&:hover': {
            backgroundColor: theme.colors.gray[1],
          },
    }
  }));

const IconApp = (props: IconAppProps) => {
    const { classes } = useStyles();
    return (
        <>
            <UnstyledButton onClick={() => props.navigation.goTo(MAIN_PAGE)} type = "button" className={classes.titleButton}>
                <Title order={1}>Rabbit Buy</Title>
            </UnstyledButton>
        </>
    )
}

const NotUserBar = (props: NavBarProps) => {
    const { navigation, userState } = props
    return (
        <>
            <Grid>
                <Grid.Col span={3}>
                    <IconApp navigation={navigation} />
                </Grid.Col>
                <Grid.Col span="auto"></Grid.Col>
                <Grid.Col span={3}></Grid.Col>
                <Grid.Col span={3}>
                    <Center>
                        <Button onClick={() => navigation.goTo(LOGIN_PAGE)}>
                            Login
                        </Button>
                        <Space w="md" />
                        <Button onClick={() => navigation.goTo(REGISTER_PAGE)}>
                            Registrarse
                        </Button>
                    </Center>
                </Grid.Col>
            </Grid>
        </>
    )
}

const ClientBar = (props: NavBarProps) => {
    const { navigation, userState } = props
    const onLogout = useLogout(useCookieSession(), userState, navigation)
    return (
        <>
            <Grid>
                <Grid.Col span={3}>
                    <IconApp navigation={navigation} />
                </Grid.Col>
                <Grid.Col span="auto"></Grid.Col>
                <Grid.Col span={3}></Grid.Col>
                <Grid.Col span={3}>
                    <Center style={{ padding: 0 }}>
                        <ToolTip text="Configuracion">
                            <ActionIcon
                                onClick={() => navigation.goTo(PROFILE_PAGE)}
                            >
                                <Avatar radius="xl" />
                            </ActionIcon>
                        </ToolTip>
                        <Space w="md" />
                        <SimpleGrid cols={1} verticalSpacing={0} spacing="xs">
                            <Title order={5}>{userState.user?.username}</Title>
                            <Text>{userState.user?.email}</Text>
                        </SimpleGrid>
                        <Space w="sm" />
                        <ToolTip text="Logout">
                            <ActionIcon onClick={onLogout}>
                                <Avatar radius="xl" />
                            </ActionIcon>
                        </ToolTip>
                    </Center>
                </Grid.Col>
            </Grid>
        </>
    )
}

export const NavBar = (props: NavBarProps) => {
    const { userState } = props
    return (
        <>
            <AppShell
                header={
                    <Header height={70} p="md">
                        {!userState.user && <NotUserBar {...props} />}
                        {userState.user && <ClientBar {...props} />}
                    </Header>
                }
            >
                {props.children}
            </AppShell>
        </>
    )
}
