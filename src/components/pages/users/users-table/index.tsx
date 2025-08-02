import { Box, Table, Thead, Tbody, Tr, Th, Td, Image } from "@chakra-ui/react";
import Styles from "./users-table.module.scss";
import type { Dispatch, SetStateAction } from "react";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { InsertUserSchema } from "~/utils/validators";
import type { TSafeUser } from "~/utils/validators";
import * as http from "~/utils/http";
import type { QueryObserverResult } from "@tanstack/react-query";
import UsersDialog from "../users-dialog";

const tableHeaders = [
  "ID",
  "Nombre / Apellido",
  "Correo Electrónico",
  "Última conexión",
  "Ver",
  "Eliminar",
];

interface UsersTableProps {
  users: TSafeUser[];
  activeDialog: "none" | "add-user" | "view-user";
  setActiveDialog: Dispatch<SetStateAction<"none" | "add-user" | "view-user">>;
  refetchUsers: () => Promise<QueryObserverResult<unknown, Error>>;
}

export default function UsersTable({
  users,
  activeDialog,
  setActiveDialog,
  refetchUsers,
}: UsersTableProps) {
  const [selectedUser, setSelectedUser] = useState<TSafeUser | undefined>(
    undefined,
  );

  const DeleteUsers = async (value: TSafeUser) => {
    await Swal.fire({
      title: "¿Estás seguro que quieres borrar a este usuario?",
      text: `Usuario: ${value.name} ${value.lastname}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, ¡Quiero Borrarlo!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await http.del<{ status: boolean }>(
            "/deleteuser",
            value,
          );
          if (response.status) {
            await Swal.fire(
              "Borrado",
              "El usuario ha sido eliminado del sistema.",
              "success",
            );
            await refetchUsers();
          }
          if (!response.status) {
            await Swal.fire(
              "Error",
              "No puedes borrar a este usuario.",
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
      <Box maxHeight="26.5vw" overflowY="scroll" borderRadius="15px" w="74.9vw">
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
            {users.slice(0, 100).map((data, i) => (
              <Tr key={i}>
                <Td
                  color="#173F8A"
                  borderColor="#70ACB5"
                  backgroundColor="white"
                  padding=".8vw 0 .8vw 0"
                >
                  {data._id}
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
                  {data.email}
                </Td>
                <Td
                  color="#646464"
                  borderColor="#70ACB5"
                  backgroundColor="white"
                  padding=".8vw 0 .8vw 0"
                >
                  {data.lastSeen
                    ? new Date(data.lastSeen).toLocaleDateString("es-cl", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "No ha entrado nunca"}
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
                      setSelectedUser(data);
                      setActiveDialog("view-user");
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
                    onClick={() => DeleteUsers(data)}
                  >
                    <Image src="/images/delete.png" alt="Borrar" w="1.4vw" />
                  </Box>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {users.length !== 0 ? (
          <></>
        ) : (
          <Box fontSize="2vw" color="black" padding="4vw 0 0 29.5vw">
            {" "}
            No hay resultados.{" "}
          </Box>
        )}
      </Box>
      {activeDialog === "view-user" && selectedUser && (
        <UsersDialog
          isOpen={true}
          modalMode="view"
          onClose={() => setActiveDialog("none")}
          userData={selectedUser}
          refetchUsers={refetchUsers}
          defaultValues={InsertUserSchema.parse(selectedUser)}
        />
      )}
    </Box>
  );
}
