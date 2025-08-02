import { Font, StyleSheet } from "@react-pdf/renderer";

Font.register({
  family: "Raleway-regular",
  fonts: [
    { src: "/fonts/raleway-v28-latin-regular.ttf" },
    { src: "/fonts/raleway-v28-latin-800.ttf", fontWeight: 800 },
  ],
});

const styles = StyleSheet.create({
  masterContainer: {
    flexDirection: "row",
  },
  container: {
    flexDirection: "column",
    fontFamily: "Raleway-regular",
    fontSize: "2.4vw",
    padding: "9% 0 0 15%",
    alignItems: "center",
    letterSpacing: "1pt",
    lineHeight: "2pt",
  },
  sello: {
    fontSize: "2vw",
    fontWeight: "800",
    padding: "9% 0 0 8%",
  },
  Nota: {
    fontSize: "1.6vw",
    fontWeight: "800",
    padding: "9% 0 0 0",
  },
  notaContents: {
    fontSize: "1.6vw",
    fontWeight: "800",
    padding: "9% 0 0 1%",
  },
});
export default styles;
