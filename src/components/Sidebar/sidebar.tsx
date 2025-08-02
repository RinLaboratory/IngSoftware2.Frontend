"use client";

import { Box, VStack, Link, Image, Flex } from "@chakra-ui/react";
import Styles from "./sidebar.module.scss";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const LinkItems = [
    {
      name: "Tablero Principal",
      icon: "/images/dashboard_black.png",
      ref: "/",
      class: Styles.topics,
    },
    {
      name: "Documentos",
      icon: "/images/docs_black.png",
      ref: "/Documentos",
      class: Styles.topics,
    },
    {
      name: "Usuarios",
      icon: "/images/users_black.png",
      ref: "/Usuarios",
      class: Styles.topics,
    },
  ];

  const Items = LinkItems.map((link) => {
    if (link.ref === pathname) {
      link.class = [link.class, Styles.active].join(" ");
      link.icon = link.icon.replace("black", "white");
    }
    return link;
  });

  return (
    <Box pos="fixed" className={Styles.sidebar}>
      <Link style={{ textDecoration: "none" }} href="/">
        <Image
          src="/images/logo.png"
          w="15vw"
          padding="2rem"
          margin="1rem 0 0 1rem "
        />
      </Link>
      <VStack alignItems="start">
        {Items.map((link) => (
          <Link
            key={link.name}
            style={{ textDecoration: "none" }}
            href={link.ref}
          >
            <Flex
              className={link.class}
              alignContent="center" /* paddingLeft="2vw" */
            >
              <Image
                src={`${link.icon}`}
                alt={link.name}
                w="1.5vw"
                mr="16px"
                ml="2.5vw"
              />
              {link.name}
            </Flex>
          </Link>
        ))}
        <Box paddingTop="4vw" position="sticky">
          <Link style={{ textDecoration: "none" }} href="/logout">
            <Flex alignContent="center" className={Styles.logout}>
              <Image
                src="/images/logout.svg"
                alt="Cerrar Sesión"
                w="1.5vw"
                mr="16px"
                ml="2.5vw"
              />
              Cerrar Sesión
            </Flex>
          </Link>
        </Box>
      </VStack>
      <Image src="/images/docs_white.png" w="2px" mr="2px" ml="2px" />
      <Image src="/images/dashboard_white.png" w="2px" mr="2px" ml="2px" />
      <Image src="/images/users_white.png" w="2px" mr="2px" ml="2px" />
    </Box>
  );
}
