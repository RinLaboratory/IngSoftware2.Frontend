import { Text, View } from "@react-pdf/renderer";

import styles from "./footer.module";

export default function Footer() {
  return (
    <View>
      <View style={styles.container}>
        <Text>______________________________________</Text>
        <Text>PARROCO</Text>
      </View>
      <View style={styles.sello}>
        <Text>SELLO</Text>
        <Text>PARROQUIAL</Text>
      </View>
    </View>
  );
}
