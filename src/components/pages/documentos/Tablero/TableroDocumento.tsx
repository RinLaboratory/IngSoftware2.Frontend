import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  HStack,
} from "@chakra-ui/react";
import Styles from "./Tablero.module.scss";
import { useState } from "react";
import Swal from "sweetalert2";
import * as http from "~/utils/http";
import type { TAdjacentDocuments } from "~/utils/validators";
import {
  BaptismSchema,
  ConfirmSchema,
  MarriageSchema,
  ParentSchema,
} from "~/utils/validators";
import type { TDocument } from "~/utils/validators";
import { useQuery } from "@tanstack/react-query";
import type { QueryObserverResult } from "@tanstack/react-query";
import PopUp from "../../dialogs/PopUp/PopUp";
import type { TActiveDialog } from "../../dialogs/constants";

const tableHeaders = [
  "ID",
  "Nombre / Apellido",
  "Fecha inscripción",
  "Sacramentos",
  "Ver",
  "Eliminar",
];

interface TableroProps {
  documents: TDocument[];
  refetch: () => Promise<QueryObserverResult<unknown, Error>>;
}

export default function Tablero({ documents, refetch }: TableroProps) {
  const [activeDialog, setActiveDialog] = useState<TActiveDialog>("none");
  const [selectedDocument, setSelectedDocument] = useState<
    TDocument | undefined
  >(undefined);

  const { data: adjacentDocuments, refetch: refetchAdjacentDocuments } =
    useQuery<TAdjacentDocuments>({
      queryKey: [
        `/getadjacentdocuments?&b_id=${selectedDocument?.Bautismo.b_id ?? ""}&c_id=${selectedDocument?.Confirmacion.c_id ?? ""}&m_id=${selectedDocument?.Matrimonio.m_id ?? ""}&p_id=${selectedDocument?.parent_Data.p_id ?? ""}`,
      ],
      staleTime: 1000,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      enabled: !!selectedDocument,
    });

  const Deletedocument = async (value: TDocument) => {
    await Swal.fire({
      title: "¿Estás seguro que quieres borrar este documento?",
      text: `Documento: ${value.name} ${value.lastname}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, ¡Quiero Borrarlo!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const data = await http.post<{ status: boolean }>(
            "/deletedocument",
            value,
          );
          if (data.status) {
            await Swal.fire(
              "Borrado",
              "El documento ha sido eliminado del sistema.",
              "success",
            );
            await refetch();
          } else {
            await Swal.fire(
              "Error",
              "No puedes borrar este documento.",
              "error",
            );
          }
        } catch {
          await Swal.fire(
            "Error 500",
            "Porfavor Informe al administrador",
            "error",
          );
        }
      }
    });
  };

  return (
    <Box padding="1vw 0 0 2vw">
      <Box maxHeight="39vw" overflowY="scroll" borderRadius="15px" w="74.9vw">
        <Table className={Styles.UVregular}>
          <Thead>
            <Tr>
              {tableHeaders.map((header) => (
                <Th
                  key={header}
                  color="white"
                  borderColor="white"
                  paddingTop="1%"
                  backgroundColor="rgb(238, 152, 81)"
                >
                  {header}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {documents.slice(0, 100).map((data, i) => (
              <Tr key={i}>
                <Td
                  color="#173F8A"
                  borderColor="#70ACB5"
                  backgroundColor="white"
                  padding=".8vw 0 .8vw 0"
                >
                  {data.n_id}
                </Td>
                <Td
                  color="#646464"
                  borderColor="#70ACB5"
                  backgroundColor="white"
                  padding=".8vw 0 .8vw 0"
                >
                  {data.name} {data.lastname}
                </Td>
                <Td
                  color="#646464"
                  borderColor="#70ACB5"
                  backgroundColor="white"
                  padding=".8vw 0 .8vw 0"
                >
                  {new Date(data.inscr_Date).toLocaleDateString("es-cl", {
                    timeZone: "GMT",
                  })}
                </Td>
                <Td
                  color="#646464"
                  borderColor="#70ACB5"
                  backgroundColor="white"
                  padding=".8vw 0 .8vw 0"
                >
                  <HStack spacing="12%" justifyContent="center">
                    {data.Bautismo.b_id != "" ? (
                      <Image
                        src="/images/bautismo_black.png"
                        alt="Ver"
                        w="1.5vw"
                      />
                    ) : (
                      <Image
                        src="/images/bautismo_white.png"
                        alt="Borrar"
                        w="1.4vw"
                      />
                    )}
                    {data.Confirmacion.c_id != "" ? (
                      <Image
                        src="/images/confirmacion_black.png"
                        alt="Ver"
                        w="1.5vw"
                      />
                    ) : (
                      <Image
                        src="/images/confirmacion_white.png"
                        alt="Borrar"
                        w="1.4vw"
                      />
                    )}
                    {data.Matrimonio.m_id != "" ? (
                      <Image
                        src="/images/matrimonio_black.png"
                        alt="Ver"
                        w="1.5vw"
                      />
                    ) : (
                      <Image
                        src="/images/matrimonio_white.png"
                        alt="Borrar"
                        w="1.4vw"
                      />
                    )}
                    */
                  </HStack>
                </Td>
                <Td
                  color="#FF5B59"
                  borderColor="#70ACB5"
                  backgroundColor="white"
                  padding=".8vw 0 .8vw 0"
                >
                  <Box
                    className={Styles.ver}
                    onClick={() => {
                      setSelectedDocument(data);
                      setActiveDialog("persona");
                    }}
                  >
                    <Image src="/images/view.png" alt="Ver" w="1.5vw" />
                  </Box>
                </Td>
                <Td
                  color="#FF5B59"
                  borderColor="#70ACB5"
                  backgroundColor="white"
                  padding=".8vw 0 .8vw 0"
                >
                  <Box
                    className={Styles.borrar}
                    onClick={() => Deletedocument(data)}
                  >
                    <Image src="/images/delete.png" alt="Borrar" w="1.4vw" />
                  </Box>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {documents.length !== 0 ? (
          <></>
        ) : (
          <Box fontSize="2vw" color="black" padding="4vw 0 0 29.5vw">
            {" "}
            No hay resultados.{" "}
          </Box>
        )}
      </Box>
      {selectedDocument && adjacentDocuments && activeDialog !== "none" && (
        <PopUp
          activeDialog={activeDialog}
          setActiveDialog={setActiveDialog}
          modalMode="view"
          adjacentDocuments={adjacentDocuments}
          document={selectedDocument}
          refetchDocuments={async () => {
            await refetch();
            await refetchAdjacentDocuments();
          }}
          defaultValues={{
            A_bautismo: false,
            A_confirmacion: false,
            A_matrimonio: false,
            A_parent: false,
            Documento: selectedDocument,
            Bautismo: BaptismSchema.partial().parse(adjacentDocuments.Bautismo),
            Confirmacion: adjacentDocuments.Confirmacion
              ? ConfirmSchema.partial().parse(adjacentDocuments.Confirmacion)
              : {},
            Matrimonio: adjacentDocuments.Matrimonio
              ? MarriageSchema.partial().parse(adjacentDocuments.Matrimonio)
              : {},
            parent_Data: adjacentDocuments.parent_Data
              ? ParentSchema.partial().parse(adjacentDocuments.parent_Data)
              : {},
          }}
        />
      )}
    </Box>
  );
}
