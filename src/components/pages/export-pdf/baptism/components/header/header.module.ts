import { Font, StyleSheet } from "@react-pdf/renderer";

Font.register({
  family: "Raleway-regular",
  fonts: [
    { src: "/fonts/raleway-v28-latin-regular.ttf" },
    { src: "/fonts/raleway-v28-latin-800.ttf", fontWeight: 800 },
  ],
});

const styles = StyleSheet.create({
  subcontainerR: {
    flexDirection: "column",
    alignItems: "flex-end",
    padding: "5% 0 0 52%",
    lineHeight: "1rem",
    fontFamily: "Raleway-regular",
    fontSize: "2.4vw",
    fontWeight: "800",
  },
  subcontainerL: {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "5% 0 0 10%",
    lineHeight: "1rem",
    fontFamily: "Raleway-regular",
    fontSize: "2.4vw",
    fontWeight: "800",
  },
  container: {
    flexDirection: "row",
  },
  title: {
    padding: "5% 0 0 17%",
    fontFamily: "Raleway-regular",
    fontSize: "3.7vw",
    fontWeight: "800",
  },
});
export default styles;
