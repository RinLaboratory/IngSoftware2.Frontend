import { VStack, HStack, Box, Input, Image } from "@chakra-ui/react";
import Styles from "./users-search-bar.module.scss";
import type { SingleValue } from "react-select";
import Select from "react-select";
import type { Dispatch, SetStateAction, ChangeEvent } from "react";
import type { TUsersFilters, TUsersQuery } from "..";
import UsersDialog from "../users-dialog";
import type { QueryObserverResult } from "@tanstack/react-query";

const options = [
  { value: "NOMBRE", label: "NOMBRE" },
  { value: "APELLIDO", label: "APELLIDO" },
  { value: "CORREO", label: "CORREO" },
  { value: "ID", label: "ID" },
];

interface UsersSearchBarProps {
  query: TUsersQuery;
  setQuery: Dispatch<SetStateAction<TUsersQuery>>;
  activeDialog: "none" | "add-user" | "view-user";
  setActiveDialog: Dispatch<SetStateAction<"none" | "add-user" | "view-user">>;
  refetchUsers: () => Promise<QueryObserverResult<unknown, Error>>;
}

export default function UsersSearchBar({
  query,
  setQuery,
  activeDialog,
  setActiveDialog,
  refetchUsers,
}: UsersSearchBarProps) {
  // guardamos los valores del input
  const handleInputText = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery({
      ...query,
      buscar: event.target.value,
    });
  };

  // guardamos los valores de ambos select
  const handleSelectValue =
    (tag: "search" | "orderBy") =>
    (event: SingleValue<{ label: string; value: string } | undefined>) => {
      if (tag == "orderBy") {
        setQuery({
          ...query,
          ordenar: (event?.value ?? "") as TUsersFilters,
        });
      }
      if (tag == "search") {
        setQuery({
          ...query,
          search: (event?.value ?? "") as TUsersFilters,
        });
      }
    };

  return (
    <Box padding="1.5vw 0 0 .8vw">
      <HStack>
        <VStack alignItems="start">
          <Box paddingLeft="1.2vw">Buscar por:</Box>
          <HStack>
            <Box>
              <Select
                className={Styles.select}
                options={options}
                onChange={handleSelectValue("search")}
              />
            </Box>
            <Box paddingLeft="1vw">
              <Input
                backgroundColor="white"
                className={Styles.input}
                placeholder="Ingresa el texto aquí..."
                focusBorderColor="rgb(112, 172, 181)"
                value={query.buscar}
                name="Frame"
                onChange={handleInputText}
              />
            </Box>
            <Box w="25vw" h="2vw" />
          </HStack>
        </VStack>
        <HStack>
          <VStack alignItems="start">
            <Box paddingLeft="1.2vw">Ordenar por:</Box>
            <Box paddingRight="2vw">
              <Select
                className={Styles.select}
                options={options}
                onChange={handleSelectValue("orderBy")}
              />
            </Box>
          </VStack>
          <Box paddingTop="1.5vw">
            <Box
              className={Styles.boton}
              onClick={() => setActiveDialog("add-user")}
            >
              <Box paddingLeft="1vw">
                <Image src="/images/plus.png" alt="Borrar" w="1.2vw" />
              </Box>
              <Box paddingLeft=".5vw">Añadir Usuario</Box>
            </Box>
          </Box>
        </HStack>
      </HStack>
      <UsersDialog
        isOpen={activeDialog === "add-user"}
        modalMode="add"
        onClose={() => setActiveDialog("none")}
        refetchUsers={refetchUsers}
      />
    </Box>
  );
}
