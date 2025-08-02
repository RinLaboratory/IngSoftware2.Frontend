"use client";

import { Box, HStack, Input, Stack, VStack, Image } from "@chakra-ui/react";
import Styles from "./documents-search-bar.module.scss";
import type { SingleValue } from "react-select";
import Select from "react-select";
import { Button } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import type { ChangeEvent } from "react";
import { useState } from "react";
import React from "react";
import type { OrderBy, QueryDocuments, SelectValue } from "~/utils/validators";
import type { TActiveDialog } from "../../sacrament-dialogs/constants";
import PopUp from "../../sacrament-dialogs/person-dialog";

const options = [
  { value: "NOMBRE", label: "Nombre" },
  { value: "APELLIDO", label: "Apellido" },
  { value: "MAS_ANTIGUO", label: "Mas Antiguo" },
  { value: "MAS_RECIENTE", label: "Mas Reciente" },
];
const options2 = [
  { value: "NOMBRE", label: "Nombre" },
  { value: "APELLIDO", label: "Apellido" },
  { value: "FECHAINSCRIPCION", label: "Fecha de Inscripción" },
  { value: "ID", label: "id" },
];

interface DocumentsSearchBarProps {
  query: QueryDocuments;
  setQuery: React.Dispatch<React.SetStateAction<QueryDocuments>>;
  isLoadingDocuments: boolean;
}

export default function DocumentsSearchBar({
  query,
  setQuery,
  isLoadingDocuments,
}: DocumentsSearchBarProps) {
  const [activeDialog, setActiveDialog] = useState<TActiveDialog>("none");

  // guardamos el texto de la busqueda
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery({
      ...query,
      search: event.target.value,
    });
  };

  // guardamos los select de ordenar por y buscar por
  const handleSelectValue =
    (name: "search" | "orderBy") =>
    (event: SingleValue<{ label: string; value: string } | undefined>) => {
      if (name === "search") {
        setQuery({
          ...query,
          selectValue: (event?.value ?? "default") as SelectValue,
        });
      }
      if (name === "orderBy") {
        setQuery({
          ...query,
          orderBy: (event?.value ?? "") as OrderBy,
        });
      }
    };

  // cambiar el estado del filtro
  const handleButtonOnPress = (name: string, value: boolean) => () => {
    setQuery({
      ...query,
      [name]: value,
    });
  };

  return (
    <Box padding="1vw" className={Styles.Buscar}>
      <HStack>
        <VStack alignItems="start" marginLeft="1vw">
          <Box w="7vw">Buscar Por:</Box>
          <HStack w="23vw">
            <Box w="10vw">
              {!isLoadingDocuments ? (
                <Select
                  value={options2.find(
                    ({ value }) => value === query.selectValue,
                  )}
                  className={Styles.Select}
                  onChange={handleSelectValue("search")}
                  options={options2}
                />
              ) : (
                <Input
                  backgroundColor="white"
                  readOnly
                  placeholder="Cargando..."
                />
              )}
            </Box>
            {query.selectValue !== "FECHAINSCRIPCION" ? (
              <Input
                w="13vw"
                className="form-control mb-2"
                placeholder="Ingresa el texto aquí..."
                backgroundColor="white"
                value={query.search}
                onChange={handleInputChange}
              />
            ) : (
              <Input
                w="13vw"
                backgroundColor="white"
                placeholder="Select Date and Time"
                type="date"
                size="md"
                value={query.search}
                onChange={handleInputChange}
              />
            )}
          </HStack>
        </VStack>
        <VStack alignItems="start" marginLeft="1vw">
          <Box paddingLeft="1vw">¿Qué Buscas?</Box>
          <HStack>
            <Stack direction="row" align="center" padding="0 1vw 0 1vw">
              <Button
                colorScheme="teal"
                variant="outline"
                w=".5vw"
                onClick={handleButtonOnPress("bautismo", !query.bautismo)}
              >
                {query.bautismo ? <CheckIcon color="black" /> : <></>}
              </Button>
              <Box>Bautismo</Box>
            </Stack>
            <Stack direction="row" align="center" padding="0 1vw 0 1vw">
              <Button
                colorScheme="teal"
                variant="outline"
                w="1vw"
                onClick={handleButtonOnPress(
                  "confirmacion",
                  !query.confirmacion,
                )}
              >
                {query.confirmacion ? <CheckIcon color="black" /> : <></>}
              </Button>
              <Box>Confirmacion</Box>
            </Stack>
            <Stack direction="row" align="center" padding="0 1vw 0 1vw">
              <Button
                colorScheme="teal"
                variant="outline"
                w="1vw"
                onClick={handleButtonOnPress("matrimonio", !query.matrimonio)}
              >
                {query.matrimonio ? <CheckIcon color="black" /> : <></>}
              </Button>
              <Box>Matrimonio</Box>
            </Stack>
          </HStack>
        </VStack>
        <VStack alignItems="start" marginLeft="1vw">
          <Box>Ordenar por</Box>
          <Box w="10vw">
            {!isLoadingDocuments ? (
              <Select
                value={options.find(({ value }) => value === query.selectValue)}
                className={Styles.Select}
                onChange={handleSelectValue("orderBy")}
                options={options}
              />
            ) : (
              <Input
                backgroundColor="white"
                readOnly
                placeholder="Cargando..."
              />
            )}
          </Box>
        </VStack>
        <Box padding="1vw 0 0 1vw">
          <Box
            className={Styles.ver}
            onClick={() => setActiveDialog("persona")}
          >
            <Image src="/images/plus.png" alt="Ver" w="1.3vw" h="1.3vw" />
          </Box>
        </Box>
      </HStack>
      <PopUp
        activeDialog={activeDialog}
        setActiveDialog={setActiveDialog}
        modalMode="add"
      />
    </Box>
  );
}
