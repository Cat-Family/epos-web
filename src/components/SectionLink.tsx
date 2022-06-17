import React from "react";
import { Plus, History, Messages, Database } from "tabler-icons-react";
import { ThemeIcon, UnstyledButton, Group, Text } from "@mantine/core";
import { Link } from "react-router-dom";

interface SectionLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  path: string;
}

function SectionLink({ icon, color, label, path }: SectionLinkProps) {
  return (
    <UnstyledButton
      component={Link}
      to={path}
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

const data = [
  { icon: <Plus size={32} />, color: "blue", label: "餐台", path: "/" },
  {
    icon: <Messages size={32} />,
    color: "teal",
    label: "订单",
    path: "/orders",
  },
  {
    icon: <History size={32} />,
    color: "violet",
    label: "账单",
    path: "/bill",
  },
  {
    icon: <Database size={32} />,
    color: "grape",
    label: "报表",
    path: "/report",
  },
];

export function SectionLinks() {
  const links = data.map((link) => <SectionLink {...link} key={link.label} />);
  return <div>{links}</div>;
}
