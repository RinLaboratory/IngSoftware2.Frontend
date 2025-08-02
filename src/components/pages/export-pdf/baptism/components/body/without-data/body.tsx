import { Text, View } from "@react-pdf/renderer";

import styles from "../body.module";
import Footer from "../../footer/footer";

export default function BodyWithoutData() {
  return (
    <View>
      <View style={styles.container}>
        <Text>CERTIFICO que en el Libro N° ________ Página _________ de</Text>
        <Text>Bautismo se encuentra la siguiente partida:</Text>
        <Text>
          En la Parroquia ________________________________________________
        </Text>
        <Text>a ________ de ______________ del año _________ se bautizó</Text>
        <Text>
          a _____________________________________________________________
        </Text>
        <Text>RUT.:______ ____________________</Text>
        <Text>
          nacido/a el ____________________________________________________
        </Text>
        <Text>
          Hij__ de _______________________________________________________
        </Text>
        <Text>
          y de __________________________________________________________
        </Text>
        <Text>
          Padrinos _______________________________________________________
        </Text>
        <Text>
          _______________________________________________________________
        </Text>
        <Text>
          _______________________________________________________________
        </Text>
        <Text>
          doy fe _________________________________________________________
        </Text>
        <Text>
          En constancia, sello y firmo en _____________________________________
        </Text>
        <Text>
          El _______ de ________________________ de 20 __________________
        </Text>
        <Footer />
      </View>
    </View>
  );
}
