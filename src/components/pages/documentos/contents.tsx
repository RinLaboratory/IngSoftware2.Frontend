"use client";

import { Box } from "@chakra-ui/react";
import BarraBusqueda from "./barra_busqueda/BarraBusqueda";
import Tablero from "./Tablero/TableroDocumento";
import React, { useMemo, useState } from "react";
import type { QueryDocuments, TDocument } from "~/utils/validators";
import { applyOrderBy, filterDocumentsBySacrament } from "./actions";
import { useQuery } from "@tanstack/react-query";

export default function Contents() {
  const [query, setQuery] = useState<QueryDocuments>({
    search: "",
    selectValue: "default",
    orderBy: "",
    bautismo: false,
    confirmacion: false,
    matrimonio: false,
  });

  const { data, refetch } = useQuery<{
    documents: TDocument[];
  }>({
    queryKey: [
      `/getdocument?&search=${query.search}&selectValue=${query.selectValue}`,
    ],
    staleTime: 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const filteredDocuments = useMemo(() => {
    const _documents = data?.documents ?? [];

    const _filteredDocuments = filterDocumentsBySacrament(
      applyOrderBy(_documents, query.orderBy),
      query,
    );

    return _filteredDocuments;
  }, [query, data]);

  return (
    <Box marginLeft="20vw" paddingTop="1.5vw">
      <Box
        backgroundColor="rgb(247, 192, 134)"
        h="47vw"
        w="78vw"
        borderRadius="15px"
      >
        <BarraBusqueda query={query} setQuery={setQuery} />
        <Tablero documents={filteredDocuments} refetch={refetch} />
      </Box>
    </Box>
  );
}
