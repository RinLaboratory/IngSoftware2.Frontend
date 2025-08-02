"use client";

import { Box } from "@chakra-ui/react";
import UsersNotifications from "./users-notifications";
import Styles from "./users.module.scss";
import UsersSearchBar from "./users-search-bar";
import UsersTable from "./users-table";
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

export default function Users() {
  const [activeDialog, setActiveDialog] = useState<
    "none" | "add-user" | "view-user"
  >("none");
  const [query, setQuery] = useState<TUsersQuery>({
    search: "",
    buscar: "",
    ordenar: "",
  });

  const {
    data: usersData,
    isLoading: isLoadingUsersData,
    refetch,
  } = useQuery<{
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
        <UsersNotifications />
        <Box className={Styles.boxusuarios}>
          <UsersSearchBar
            query={query}
            setQuery={setQuery}
            activeDialog={activeDialog}
            setActiveDialog={setActiveDialog}
            refetchUsers={refetch}
            isLoadingUsersData={isLoadingUsersData}
          />
          <UsersTable
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
