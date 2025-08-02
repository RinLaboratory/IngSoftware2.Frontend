import { Box, HStack } from "@chakra-ui/react";
import Notificaciones from "./notificaciones/notificaciones";
import Styles from "./contents.module.scss";
import Calendario from "./calendario/calendario";
import AccesoDirecto from "./acceso_directo/acceso_directo";

export default function Contents() {
  return (
    <Box paddingLeft="18vw" paddingTop="3vw">
      <Notificaciones />
      <HStack spacing="3.5%" alignContent="center" margin="4vw 0 0 5vw">
        <Box className={Styles.cajitas} w="41vw" h="30vw">
          <AccesoDirecto />
        </Box>
        <Box className={Styles.cajitas} w="30vw" h="30vw">
          <Calendario />
        </Box>
      </HStack>
    </Box>
  );
}
