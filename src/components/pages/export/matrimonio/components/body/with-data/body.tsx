import { Text, View } from "@react-pdf/renderer";

import styles from "../body.module";
import Footer from "../../footer/footer";
import type { TAdjacentDocuments, TDocument } from "~/utils/validators";

interface BodyProps {
  document: TDocument;
  adjacentDocuments: TAdjacentDocuments;
}

export default function BodyWithData({
  document,
  adjacentDocuments,
}: BodyProps) {
  const currentDate = new Date();
  const bautizoDate = adjacentDocuments.Bautismo.b_date
    .replace("?", "1")
    .split("-");
  const cumpleDate = document.birth.replace("?", "1").split("-");
  const mesBautizo = new Date(
    adjacentDocuments.Bautismo.b_date.replace("?", "1"),
  );
  const mesCumple = new Date(document.birth.replace("?", "1"));

  return (
    <View>
      <View style={styles.container} wrap={false}>
        {document.Tomo === "" ? (
          <></>
        ) : (
          <View style={{ flexDirection: "column", paddingBottom: "1%" }}>
            <Text style={{ flex: 1, padding: "0 0 0 52%" }}>
              {document.Tomo}{" "}
            </Text>
            <Text style={{ flex: 1, padding: "0 0 0 80%" }}>
              {document.Pag}{" "}
            </Text>
          </View>
        )}
        <Text>CERTIFICO que en el Libro N° ________ Página _________ de</Text>
        <Text>Bautismo se encuentra la siguiente partida:</Text>
        <Text>En la Parroquia SANTO TORIBIO DE MOGROVEJO, LAS CONDES</Text>
        {bautizoDate[0] === "" ? (
          <></>
        ) : (
          <View style={{ flexDirection: "column", paddingBottom: "1%" }}>
            <Text style={{ flex: 1, padding: "0 0 0 6%" }}>
              {bautizoDate[2]}
            </Text>
            <Text style={{ flex: 1, padding: "0 0 0 26%" }}>
              {new Intl.DateTimeFormat("es-ES", { month: "long" }).format(
                mesBautizo,
              )}
            </Text>
            <Text style={{ flex: 1, padding: "0 0 0 62%" }}>
              {bautizoDate[0]}
            </Text>
          </View>
        )}
        <Text>a ________ de ______________ del año _________ se bautizó</Text>
        <View style={{ flexDirection: "column", paddingBottom: "1%" }}>
          <Text style={{ flex: 1, padding: "0 0 1% 6%" }}>
            {document.name} {document.lastname}
          </Text>
        </View>
        <Text>
          a _____________________________________________________________
        </Text>
        {document.rut === "" ? (
          <></>
        ) : (
          <View style={{ flexDirection: "column", paddingBottom: "1%" }}>
            <Text style={{ flex: 1, padding: "0 0 0 10%" }}>
              {document.rut}
            </Text>
          </View>
        )}
        <Text>RUT.:__________________________</Text>
        {cumpleDate[0] === "" ? (
          <></>
        ) : (
          <View style={{ flexDirection: "column", paddingBottom: "1%" }}>
            <Text style={{ flex: 1, padding: "0 0 0 20%" }}>
              {cumpleDate[2]} de{" "}
              {new Intl.DateTimeFormat("es-ES", { month: "long" }).format(
                mesCumple,
              )}{" "}
              del año {cumpleDate[0]}, {document.birthplace}
            </Text>
          </View>
        )}
        <Text>
          nacido/a el ____________________________________________________
        </Text>
        {adjacentDocuments.parent_Data?.p_father === "" ? (
          <></>
        ) : (
          <View style={{ flexDirection: "column", paddingBottom: "1%" }}>
            <Text style={{ flex: 1, padding: "0 0 0 15%" }}>
              {adjacentDocuments.parent_Data?.p_father}
            </Text>
          </View>
        )}
        <Text>
          Hij__ de _______________________________________________________
        </Text>
        {adjacentDocuments.parent_Data?.p_mother === "" ? (
          <></>
        ) : (
          <View style={{ flexDirection: "column", paddingBottom: "1%" }}>
            <Text style={{ flex: 1, padding: "0 0 0 9%" }}>
              {adjacentDocuments.parent_Data?.p_mother}
            </Text>
          </View>
        )}
        <Text>
          y de __________________________________________________________
        </Text>
        <Text>
          Padrinos _______________________________________________________
        </Text>
        {adjacentDocuments.Bautismo.b_padrino === "" ? (
          <></>
        ) : (
          <View style={{ flexDirection: "column", paddingBottom: "1%" }}>
            <Text style={{ flex: 1, padding: "0 0 0 2%" }}>
              {adjacentDocuments.Bautismo.b_padrino} y
            </Text>
          </View>
        )}
        <Text>
          _______________________________________________________________
        </Text>
        {adjacentDocuments.Bautismo.b_madrina === "" ? (
          <></>
        ) : (
          <View style={{ flexDirection: "column", paddingBottom: "1%" }}>
            <Text style={{ flex: 1, padding: "0 0 0 2%" }}>
              {adjacentDocuments.Bautismo.b_madrina}.
            </Text>
          </View>
        )}
        <Text>
          _______________________________________________________________
        </Text>
        <Text>
          doy fe _________________________________________________________
        </Text>
        <Text>
          En constancia, sello y firmo en _____________________________________
        </Text>
        <View style={{ flexDirection: "column", paddingBottom: "1%" }}>
          <Text style={{ flex: 1, padding: "0 0 0 7%" }}>
            {currentDate.getDate()}
          </Text>
          <Text style={{ flex: 1, padding: "0 0 0 30%" }}>
            {new Intl.DateTimeFormat("es-ES", { month: "long" }).format(
              currentDate,
            )}
          </Text>
          <Text style={{ flex: 1, padding: "0 0 0 80%" }}>
            {currentDate.getFullYear() - 2000}
          </Text>
        </View>
        <Text>
          El _______ de ________________________ de 20 __________________
        </Text>
        <Footer />
      </View>
    </View>
  );
}
