import { useState } from 'react';
import '../Styles/MainShellStyle.css';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Grid,
} from '@mantine/core'
import { SignInButton } from './SignInButton';
import { SignUpButton } from './SignUpButton';

type LoginButtonProps = {
    onClick : () => void
}

function HeaderMain(props : LoginButtonProps) {
  return (
    <AppShell
      padding="md"
      navbar={<Navbar width={{ base: 300 }} height={500} p="xs">{/* Navbar content */}</Navbar>}
      header={<Header className='App-header' height={50} p="xs">{
        <>
        <Grid>
          <Grid.Col span={3}>
            <SignInButton onClick={props.onClick}></SignInButton>
          </Grid.Col>
          <Grid.Col span={3}  offset={3}>
            <SignUpButton onClick={props.onClick}></SignUpButton>
         </Grid.Col>
        </Grid>
        </>
      }

        </Header>}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      
    </AppShell>
  );
}

export default HeaderMain;
