"use client";

import {
  Box,
  VStack,
  Image,
  Link,
  HStack,
  Button,
  Table,
} from "@chakra-ui/react";
import Styles from "./acceso_directo.module.scss";
import { FaFacebook } from "react-icons/fa";
import { useState } from "react";
import PopUp from "../../dialogs/PopUp/PopUp";
import type { TActiveDialog } from "../../dialogs/constants";

export default function AccesoDirecto() {
  const [activeDialog, setActiveDialog] = useState<TActiveDialog>("none");

  return (
    <Box>
      <Box className={Styles.texto}>Accesos Directos</Box>
      <VStack gap="4">
        <Link onClick={() => setActiveDialog("persona")}>
          <Box className={Styles.boton}>
            <Box className={Styles.boton_imagenes}>
              <Image
                src="/images/unused_black.png"
                w="1.8vw"
                margin=".4vw 0 0 .89vw"
              />
            </Box>
            <Box className={Styles.boton_texto}>Crear Documento</Box>
          </Box>
        </Link>

        <Box className={Styles.boton}>
          <Box className={Styles.boton_imagenes}>
            <Image
              src="/images/unused_black.png"
              w="1.8vw"
              margin=".4vw 0 0 .89vw"
            />
          </Box>
          <Box className={Styles.boton_texto}>
            <Table className={Styles.UVregular}>
              <HStack alignItems="start" marginLeft="1vw">
                <HStack alignItems="start" marginLeft="1vw" spacing="2%">
                  <VStack alignItems="start" marginLeft="1vw" spacing="2%">
                    <Box flexDir="row" alignItems="center">
                      <Link
                        href="https://web.facebook.com/Parroquia-Santo-Toribio-de-Las-Condes-474555292658302/"
                        isExternal
                        padding="vw"
                      >
                        <Button
                          colorScheme="blue"
                          leftIcon={<FaFacebook />}
                          w="8vw"
                        >
                          Facebook
                        </Button>
                      </Link>
                    </Box>
                  </VStack>
                </HStack>
                <HStack alignItems="start" marginLeft="1vw" spacing="2%">
                  <VStack alignItems="start" marginLeft="1vw" spacing="2%">
                    <Box flexDir="row" alignItems="center">
                      <Link
                        href="https://www.youtube.com/channel/UCro3erV_F9i_WBwLpKvV4EA"
                        isExternal
                        padding="vw"
                      >
                        <Button
                          colorScheme="red"
                          leftIcon={<FaFacebook />}
                          w="8vw"
                        >
                          YouTube
                        </Button>
                      </Link>
                    </Box>
                  </VStack>
                </HStack>
              </HStack>
            </Table>
          </Box>
        </Box>

        <Link href="/ExportBaptism">
          <Box className={Styles.boton}>
            <Box className={Styles.boton_imagenes}>
              <Image
                src="/images/unused_black.png"
                w="1.8vw"
                margin=".4vw 0 0 .89vw"
              />
            </Box>
            <Box className={Styles.boton_texto}>Ver PDF Bautismo</Box>
          </Box>
        </Link>
        <Link href="/ExportConfirmacion">
          <Box className={Styles.boton}>
            <Box className={Styles.boton_imagenes}>
              <Image
                src="/images/unused_black.png"
                w="1.8vw"
                margin=".4vw 0 0 .89vw"
              />
            </Box>
            <Box className={Styles.boton_texto}>Ver PDF Confirmación</Box>
          </Box>
        </Link>
        <Link href="/ExportMatrimonio">
          <Box className={Styles.boton}>
            <Box className={Styles.boton_imagenes}>
              <Image
                src="/images/unused_black.png"
                w="1.8vw"
                margin=".4vw 0 0 .89vw"
              />
            </Box>
            <Box className={Styles.boton_texto}>Ver PDF Matrimonio</Box>
          </Box>
        </Link>
      </VStack>
      <PopUp
        activeDialog={activeDialog}
        setActiveDialog={setActiveDialog}
        modalMode="add"
      />
    </Box>
  );
}
