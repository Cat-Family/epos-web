import React, { FC, useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  ActionIcon,
  MediaQuery,
  Burger,
  useMantineTheme,
  Group,
  ScrollArea,
  ColorScheme,
} from "@mantine/core";
import { SectionLinks } from "../components/SectionLink";
import { Logo } from "../components/Logo";
import { MoonStars, Sun } from "tabler-icons-react";
import { User } from "../components/User";
import { Outlet } from "react-router-dom";

interface AppLayoutProps {
  colorScheme: ColorScheme;
  toggleColorScheme: Function;
}

const AppLayout: FC<AppLayoutProps> = ({ colorScheme, toggleColorScheme }) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar
          p="sm"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
            <SectionLinks />
          </Navbar.Section>

          <Navbar.Section>
            <User />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={70} p="md">
          <Group sx={{ height: "100%" }} px={20} position="apart">
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Logo colorScheme={colorScheme} />
            <ActionIcon
              variant="default"
              onClick={() => toggleColorScheme()}
              size={30}
            >
              {colorScheme === "dark" ? (
                <Sun size={16} />
              ) : (
                <MoonStars size={16} />
              )}
            </ActionIcon>
          </Group>
        </Header>
      }
    >
      <Outlet />
    </AppShell>
  );
};

export default AppLayout;
