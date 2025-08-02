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
    padding: "5% 0 0 10%",
    letterSpacing: "1pt",
    lineHeight: "2.3rem",
  },
});
export default styles;
