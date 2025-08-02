import { Font, StyleSheet } from "@react-pdf/renderer";

Font.register({
  family: "Raleway-regular",
  fonts: [
    { src: "/fonts/raleway-v28-latin-regular.ttf" },
    { src: "/fonts/raleway-v28-latin-800.ttf", fontWeight: 800 },
  ],
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    fontFamily: "Raleway-regular",
    fontSize: "2.4vw",
    padding: "15% 0 0 10%",
    alignItems: "center",
    letterSpacing: "1pt",
    lineHeight: "2rem",
  },
  sello: {
    fontSize: "2vw",
    fontWeight: "800",
    padding: "5% 0 0 80%",
    alignItems: "center",
    lineHeight: "1.5rem",
  },
});
export default styles;
