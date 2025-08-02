import { Text, View } from "@react-pdf/renderer";

import styles from "./footer.module";

export default function Footer() {
  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flexDirection: "column" }}>
          <View style={styles.container}>
            <Text>___________________________________</Text>
            <Text style={{ paddingLeft: "11vw" }}>PARROCO</Text>
          </View>
          <View style={styles.container2}>
            <Text> Derechos $_________________________</Text>
          </View>
        </View>
        <View style={styles.sello}>
          <Text>SELLO</Text>
          <Text>PARROQUIAL</Text>
        </View>
      </View>
    </View>
  );
}
