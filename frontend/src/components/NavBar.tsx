import {
    AppShell,
    Button,
    Center,
    Grid,
    Header,
    Space,
    Title,
} from '@mantine/core'
import { ReactNode } from 'react'

export type NavBarProps = {
    children: ReactNode | ReactNode[]
}

export const NavBar = (props: NavBarProps) => {
    return (
        <>
            <AppShell
                header={
                    <Header height={70} p="md">
                        <div>
                            <Grid>
                                <Grid.Col span={3}>
                                    <Title order={1}>Rabbit Buy</Title>
                                </Grid.Col>
                                <Grid.Col span="auto"></Grid.Col>
                                <Grid.Col span={3}></Grid.Col>
                                <Grid.Col span={3}>
                                    <Center>
                                        <Button>Loggin</Button>
                                        <Space w="md" />
                                        <Button>Registrarse</Button>
                                    </Center>
                                </Grid.Col>
                            </Grid>
                        </div>
                    </Header>
                }
            >
                {props.children}
            </AppShell>
        </>
    )
}
