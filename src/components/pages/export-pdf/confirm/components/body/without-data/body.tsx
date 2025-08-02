import { Text, View } from "@react-pdf/renderer";

import styles from "../body.module";
import Footer from "../../footer/footer";

export default function BodyWithoutData() {
  return (
    <View>
      <View style={styles.container}>
        <Text>
          Nombres _______________________________________________________
        </Text>
        <Text>
          Apellidos ______________________________________________________
        </Text>
        <Text>
          Hijo de ________________________________________________________
        </Text>
        <Text>
          y de ___________________________________________________________
        </Text>
        <Text>
          Bautizado en ___________________________________________________
        </Text>
        <Text>
          el _____________________________ Libro __________ Pág. __________
        </Text>
        <Text>
          ha sido confirmado en (lugar) ___________________________________
        </Text>
        <Text>
          el (fecha) _____________________________________________________
        </Text>
        <Text>
          por (ministro) ________________________________________________
        </Text>
        <Text>
          siendo padrino (madrina) _______________________________________
        </Text>
        <Footer />
      </View>
    </View>
  );
}
