"use client";

import { Box, VStack, HStack, Image } from "@chakra-ui/react";
import Styles from "./notificaciones.module.scss";
import { useQuery } from "@tanstack/react-query";

export default function Notificaciones() {
  const currentDate = new Date();

  const { data: notifications } = useQuery<{
    documentos: number;
    usuarios: number;
    permisos: number;
  }>({
    queryKey: [`/getnotifications`],
    staleTime: 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  return (
    <Box>
      <Box
        paddingLeft="5vw"
        fontSize="2.5vw"
        paddingBottom="4vw"
        justifyContent="space-around"
      >
        Parroquia Santo Toribio
      </Box>
      <HStack spacing="10%" paddingLeft="5vw" w="100%">
        <Box className={Styles.notificaciones}>
          <Box className={Styles.Notif_imagenes}>
            <Image
              src="/images/unused_black.png"
              w="2vw"
              margin=".4vw 0 0 .7vw"
            />
          </Box>
          <Box className={Styles.Notif_texto}>
            Documentos cargados: {notifications?.documentos ?? 0}
          </Box>
        </Box>
        <Box className={Styles.notificaciones}>
          <Box className={Styles.Notif_imagenes}>
            <Image src="/images/calendar.png" w="2vw" margin=".4vw 0 0 .7vw" />
          </Box>
          <Box className={Styles.Notif_texto}>
            <VStack alignItems="start">
              <Box>Quedan {7 - currentDate.getDay()} dias para el</Box>
              <Box>Domingo</Box>
            </VStack>
          </Box>
        </Box>
        <Box className={Styles.notificaciones}>
          <Box className={Styles.Notif_imagenes}>
            <Image src="/images/warning.png" w="2vw" margin=".4vw 0 0 .7vw" />
          </Box>
          <VStack alignItems="start">
            <Box className={Styles.Notif_texto}>Fecha de Hoy:</Box>
            <Box className={Styles.Notif_texto}>
              {currentDate.toLocaleDateString("es-cl", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </Box>
          </VStack>
        </Box>
      </HStack>
    </Box>
  );
}
