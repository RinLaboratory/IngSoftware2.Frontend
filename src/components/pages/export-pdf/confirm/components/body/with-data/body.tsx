import { Text, View } from "@react-pdf/renderer";

import styles from "../body.module";
import Footer from "../../footer/footer";
import type { TDocument } from "~/utils/validators/documento";
import type { TAdjacentDocuments } from "~/utils/validators/miscellaneous";

interface BodyProps {
  document: TDocument;
  adjacentDocuments: TAdjacentDocuments;
}

export default function BodyWithData({
  document,
  adjacentDocuments,
}: BodyProps) {
  const bautizoDate = adjacentDocuments.Bautismo.b_date
    .replace("?", "1")
    .split("-");
  const mesBautizo = new Date(
    adjacentDocuments.Bautismo.b_date.replace("?", "1"),
  );
  const confirmacionDate = adjacentDocuments.Confirmacion?.c_date
    .replace("?", "1")
    .split("-");
  const mesConfirmacion = adjacentDocuments.Confirmacion
    ? new Date(adjacentDocuments.Confirmacion.c_date.replace("?", "1"))
    : "";

  return (
    <View>
      <View style={styles.container} wrap={false}>
        <View style={{ flexDirection: "column", paddingBottom: "1%" }}>
          <Text style={{ flex: 1, padding: "0 0 0 16%" }}>{document.name}</Text>
        </View>
        <Text>
          Nombres _______________________________________________________
        </Text>
        <View style={{ flexDirection: "column", paddingBottom: "1%" }}>
          <Text style={{ flex: 1, padding: "0 0 0 16%" }}>
            {document.lastname}
          </Text>
        </View>
        <Text>
          Apellidos ______________________________________________________
        </Text>
        {adjacentDocuments.parent_Data?.p_father === "" ? (
          <></>
        ) : (
          <View style={{ flexDirection: "column", paddingBottom: "1%" }}>
            <Text style={{ flex: 1, padding: "0 0 0 13%" }}>
              {adjacentDocuments.parent_Data?.p_father}
            </Text>
          </View>
        )}
        <Text>
          Hijo de ________________________________________________________
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
          y de ___________________________________________________________
        </Text>
        {bautizoDate[0] === "" ? (
          <></>
        ) : (
          <View style={{ flexDirection: "column", paddingBottom: "1%" }}>
            <Text style={{ flex: 1, padding: "0 0 0 6%" }}>
              {bautizoDate[2]} de{" "}
              {new Intl.DateTimeFormat("es-ES", { month: "long" }).format(
                mesBautizo,
              )}{" "}
              del año {bautizoDate[0]}
            </Text>
            <Text style={{ flex: 1, padding: "0 0 0 71%" }}>
              {document.Tomo}{" "}
            </Text>
            <Text style={{ flex: 1, padding: "0 0 0 93%" }}>
              {document.Pag}{" "}
            </Text>
          </View>
        )}
        <Text>
          el _____________________________ Libro __________ Pág. __________
        </Text>
        {adjacentDocuments.Confirmacion?.c_place2 === "" ? (
          <></>
        ) : (
          <View style={{ flexDirection: "column", paddingBottom: "1%" }}>
            <Text style={{ flex: 1, padding: "0 0 0 48%" }}>
              {adjacentDocuments.Confirmacion?.c_place1}{" "}
              {adjacentDocuments.Confirmacion?.c_place2}
            </Text>
          </View>
        )}
        <Text>
          ha sido confirmado en (lugar) ___________________________________
        </Text>
        {adjacentDocuments.Bautismo.b_date === "" ? (
          <></>
        ) : (
          <View style={{ flexDirection: "column", paddingBottom: "1%" }}>
            <Text style={{ flex: 1, padding: "0 0 0 18%" }}>
              {mesConfirmacion &&
                confirmacionDate?.[2] !== undefined &&
                confirmacionDate[0] !== undefined && (
                  <>
                    {confirmacionDate[2]} de{" "}
                    {new Intl.DateTimeFormat("es-ES", { month: "long" }).format(
                      mesConfirmacion,
                    )}{" "}
                    del año {confirmacionDate[0]}
                  </>
                )}
            </Text>
          </View>
        )}
        <Text>
          el (fecha) _____________________________________________________
        </Text>
        {adjacentDocuments.Confirmacion?.c_father === "" ? (
          <></>
        ) : (
          <View style={{ flexDirection: "column", paddingBottom: "1%" }}>
            <Text style={{ flex: 1, padding: "0 0 0 23%" }}>
              {adjacentDocuments.Confirmacion?.c_father}
            </Text>
          </View>
        )}
        <Text>
          por (ministro) ________________________________________________
        </Text>
        {adjacentDocuments.Confirmacion?.c_padrino !== "" ? (
          adjacentDocuments.Confirmacion?.c_madrina !== "" ? (
            <View>
              <View style={{ flexDirection: "column", paddingBottom: "1%" }}>
                <Text style={{ flex: 1, padding: "0 0 0 40%" }}>
                  {adjacentDocuments.Confirmacion?.c_padrino}
                </Text>
              </View>
              <Text>
                siendo padrino (madrina) _______________________________________
              </Text>
              <View style={{ flexDirection: "column", paddingBottom: "1%" }}>
                <Text style={{ flex: 1, padding: "0 0 0 4%" }}>
                  {" "}
                  {adjacentDocuments.Confirmacion?.c_madrina}
                </Text>
              </View>
              <Text>
                y __________________________________________________________
              </Text>
            </View>
          ) : (
            <>
              <View style={{ flexDirection: "column", paddingBottom: "1%" }}>
                <Text style={{ flex: 1, padding: "0 0 0 40%" }}>
                  {adjacentDocuments.Confirmacion.c_padrino}
                </Text>
              </View>
              <Text>
                siendo padrino (madrina) _______________________________________
              </Text>
            </>
          )
        ) : adjacentDocuments.Confirmacion.c_madrina !== "" ? (
          <>
            <View style={{ flexDirection: "column", paddingBottom: "1%" }}>
              <Text style={{ flex: 1, padding: "0 0 0 40%" }}>
                {adjacentDocuments.Confirmacion.c_madrina}
              </Text>
            </View>
            <Text>
              siendo padrino (madrina) _______________________________________
            </Text>
          </>
        ) : (
          <>
            <Text>
              siendo padrino (madrina) _______________________________________
            </Text>
          </>
        )}
        <Footer />
      </View>
    </View>
  );
}
