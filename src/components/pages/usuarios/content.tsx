"use client";

import { Box } from "@chakra-ui/react";
import Notificaciones from "./notificaciones/notificaciones";
import Styles from "./content.module.scss";
import BarraBusqueda from "./BarraBusqueda/BarraBusqueda";
import Tablero from "./Tablero/Tablero";
import { useMemo, useState } from "react";
import type { TSafeUser } from "~/utils/validators";
import { useQuery } from "@tanstack/react-query";
import { applyOrderBy } from "./actions";

export type TUsersFilters = "NOMBRE" | "APELLIDO" | "CORREO" | "ID" | "";

export interface TUsersQuery {
  search: TUsersFilters;
  ordenar: TUsersFilters;
  buscar: string;
}

export default function Contents() {
  const [activeDialog, setActiveDialog] = useState<
    "none" | "add-user" | "view-user"
  >("none");
  const [query, setQuery] = useState<TUsersQuery>({
    search: "",
    buscar: "",
    ordenar: "",
  });

  const { data: usersData, refetch } = useQuery<{
    users: TSafeUser[];
  }>({
    queryKey: [`/getusers?&search=${query.search}&buscar=${query.buscar}`],
    staleTime: 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const filteredUsers = useMemo(() => {
    const _users = usersData?.users ?? [];

    const _filteredUsers = applyOrderBy(_users, query);

    return _filteredUsers;
  }, [query, usersData]);

  return (
    <Box marginLeft="20vw" paddingTop="1.5vw">
      <Box h="47vw" w="78vw" borderRadius="15px">
        <Notificaciones />
        <Box className={Styles.boxusuarios}>
          <BarraBusqueda
            query={query}
            setQuery={setQuery}
            activeDialog={activeDialog}
            setActiveDialog={setActiveDialog}
            refetchUsers={refetch}
          />
          <Tablero
            activeDialog={activeDialog}
            setActiveDialog={setActiveDialog}
            refetchUsers={refetch}
            users={filteredUsers}
          />
        </Box>
      </Box>
    </Box>
  );
}
