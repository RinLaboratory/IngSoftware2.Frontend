import { Box } from "@chakra-ui/react";
import CalendarComponent from "react-calendar";
import Styles from "./calendar.module.scss";

export default function Calendar() {
  const today = new Date();

  return (
    <Box>
      <Box className={Styles.texto}>Calendario</Box>
      <Box margin="1vw 2vw 0 2vw">
        <CalendarComponent activeStartDate={today} locale="es-ES" />
      </Box>
    </Box>
  );
}
