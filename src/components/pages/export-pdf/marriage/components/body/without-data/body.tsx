import { Text, View } from "@react-pdf/renderer";

import styles from "../body.module";
import Footer from "../../footer/footer";

export default function BodyWithoutData() {
  return (
    <View>
      <View style={styles.container}>
        <Text>
          CERTIFICO que en el Libro N° ________ de matrimonios, página _________
        </Text>
        <Text>se encuentra la siguiente partida:</Text>
        <Text>
          En____________________________________________________________________
        </Text>
        <Text>
          Parroquia ____________________________________________________________
        </Text>
        <Text>
          a ______________________________ de _______________ de _______________
        </Text>
        <Text>
          _____________________________________ las tres moniciones de derecho y
        </Text>
        <Text>
          _________________________________ impedimentos_________, ante_________
        </Text>
        <Text>
          ______________________________________________________________________
        </Text>
        <Text>
          ______________________________________________________________________
        </Text>
        <Text>
          Don __________________________________________________________________
        </Text>
        <Text>
          de estado ____________________________________________________________
        </Text>
        <Text>
          Hijo de ______________________________________________________________
        </Text>
        <Text>
          ______________________________________________________________________
        </Text>
        <Text>
          de _______________ años de edad, bautizado en la Parroquia
          ________________
        </Text>
        <Text>
          __________________________________________ Libro ________ Pág.
          ________
        </Text>
        <Text>
          contrajo matrimonio según el Orden de Nuestra Santa Madre Iglesia con
          _______
        </Text>
        <Text>
          ______________________________________________________________________
        </Text>
        <Text>
          de estado ____________________________________________________________
        </Text>
        <Text>
          Hija de ______________________________________________________________
        </Text>
        <Text>
          ______________________________________________________________________
        </Text>
        <Text>
          de _______________ años de edad, bautizada en la Parroquia
          ________________
        </Text>
        <Text>
          siendo testigos
          ________________________________________________________
        </Text>
        <Text>
          La velación _______________ se verificó __________________________ Doy
          fe
        </Text>
        <Text>
          _____________________________________________________________ Párroco
        </Text>
        <Text>
          Concuerda con el original citado, y para constancia sello y firmo en
          _______
        </Text>
        <Text>
          ______________________________________________________________________
        </Text>
        <Text>
          a ____________ de ______________________________ de 20 ____________
        </Text>
        <Footer />
      </View>
    </View>
  );
}
