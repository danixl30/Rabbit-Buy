import { useState } from 'react';
import './MainShellStyle.css';
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
} from '@mantine/core'


type LoginButtonProps = {
    onclick: () => void
}

function HeaderMain(props : LoginButtonProps) {
  return (
    <AppShell
      padding="md"
      navbar={<Navbar width={{ base: 300 }} height={500} p="xs">{/* Navbar content */}</Navbar>}
      header={<Header className='App-header' height={50} p="xs">{
        <button onClick={props.onclick}>Login</button>}
        </Header>}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      
    </AppShell>
  );
}

export default HeaderMain;