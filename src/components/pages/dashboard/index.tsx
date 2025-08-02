import { Box, HStack } from "@chakra-ui/react";
import Notifications from "./notifications";
import Styles from "./dashboard.module.scss";
import Calendar from "./calendar";
import Shortcuts from "./shortcuts";

export default function Dashboard() {
  return (
    <Box paddingLeft="18vw" paddingTop="3vw">
      <Notifications />
      <HStack spacing="3.5%" alignContent="center" margin="4vw 0 0 5vw">
        <Box className={Styles.cajitas} w="41vw" h="30vw">
          <Shortcuts />
        </Box>
        <Box className={Styles.cajitas} w="30vw" h="30vw">
          <Calendar />
        </Box>
      </HStack>
    </Box>
  );
}
