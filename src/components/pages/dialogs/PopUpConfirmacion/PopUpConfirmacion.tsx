import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Input,
  HStack,
  VStack,
} from "@chakra-ui/react";
import type { UseFormReturn } from "react-hook-form";
import Select from "react-select";
import {
  FormControl,
  FormField,
  FormFieldMessage,
  FormItem,
} from "~/components/ui/form/form";
import type { TParsedDocument } from "~/utils/validators";
import type { TModalMode } from "../constants";
import { modalOptions } from "../constants";
import { redirect } from "next/navigation";

interface PopUpConfirmacionProps {
  form: UseFormReturn<TParsedDocument, unknown, TParsedDocument>;
  isOpen: boolean;
  onClose: () => void;
  modalMode: TModalMode;
  documentId: string | undefined;
}

const options = [
  { value: "COLEGIO", label: "Colegio" },
  { value: "IGLESIA_PARROQUIAL", label: "Iglesia Parroquial" },
  { value: "CAPILLA_PARROQUIAL", label: "Capilla Parroquial" },
];

export default function PopUpConfirmacion({
  isOpen,
  onClose,
  modalMode,
  form,
  documentId,
}: PopUpConfirmacionProps) {
  const openPDF = () => {
    redirect(`/ExportConfirmacion?&documentId=${documentId ?? ""}`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Box>{modalOptions[modalMode]} Confirmación</Box>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <VStack alignItems="initial">
              <HStack>
                <Box w="3vw">El día</Box>
                <Box>
                  <FormField
                    control={form.control}
                    name="Confirmacion.c_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            w="10vw"
                            borderColor="black"
                            backgroundColor={"white"}
                            placeholder="Select Date and Time"
                            type="date"
                            size="md"
                            readOnly={modalMode === "view"}
                            {...field}
                          />
                        </FormControl>
                        <FormFieldMessage />
                      </FormItem>
                    )}
                  />
                </Box>
              </HStack>
              <HStack paddingTop="1vw">
                <Box w="22vw">
                  <FormField
                    control={form.control}
                    name="Documento.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            borderColor="black"
                            readOnly={modalMode === "view"}
                            placeholder="Nombre de la persona"
                            {...field}
                          />
                        </FormControl>
                        <FormFieldMessage />
                      </FormItem>
                    )}
                  />
                </Box>
                <Box w="22vw">
                  <FormField
                    control={form.control}
                    name="Documento.lastname"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            borderColor="black"
                            readOnly={modalMode === "view"}
                            placeholder="Apellido de la persona"
                            {...field}
                          />
                        </FormControl>
                        <FormFieldMessage />
                      </FormItem>
                    )}
                  />
                </Box>
              </HStack>
              <HStack paddingTop="1vw">
                <Box w="6vw">se confirmó por</Box>
                <Box w="26vw">
                  <FormField
                    control={form.control}
                    name="Confirmacion.c_father"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            borderColor="black"
                            readOnly={modalMode === "view"}
                            placeholder="Nombre y Apellido del Ministro"
                            {...field}
                          />
                        </FormControl>
                        <FormFieldMessage />
                      </FormItem>
                    )}
                  />
                </Box>
              </HStack>
              <HStack paddingTop="1vw">
                <Box>En</Box>
                <FormField
                  control={form.control}
                  name="Confirmacion.c_place1"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Box
                          w="15vw"
                          borderColor="black"
                          border="1px"
                          borderRadius="5px"
                        >
                          <Select
                            {...field}
                            value={
                              field.value == "COLEGIO"
                                ? {
                                    label: options[0]?.label,
                                    value: options[0]?.value,
                                  }
                                : field.value == "CAPILLA_PARROQUIAL"
                                  ? {
                                      label: options[2]?.label,
                                      value: options[2]?.value,
                                    }
                                  : {
                                      label: options[1]?.label,
                                      value: options[1]?.value,
                                    }
                            }
                            onChange={(e) =>
                              form.setValue("Confirmacion.c_place1", e?.value)
                            }
                            options={options}
                            isDisabled={modalMode === "view"}
                          />
                        </Box>
                      </FormControl>
                      <FormFieldMessage />
                    </FormItem>
                  )}
                />
                <Box w="27.4vw">
                  <FormField
                    control={form.control}
                    name="Confirmacion.c_place2"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            borderColor="black"
                            readOnly={modalMode === "view"}
                            placeholder="Santo Toribio"
                            {...field}
                          />
                        </FormControl>
                        <FormFieldMessage />
                      </FormItem>
                    )}
                  />
                </Box>
              </HStack>
              <HStack paddingTop="1vw">
                <Box>Los cuales fueron testigos</Box>
                <Box w="15.5vw">
                  <FormField
                    control={form.control}
                    name="Confirmacion.c_padrino"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            borderColor="black"
                            readOnly={modalMode === "view"}
                            placeholder="Nombre y Apellido del Padrino"
                            {...field}
                          />
                        </FormControl>
                        <FormFieldMessage />
                      </FormItem>
                    )}
                  />
                </Box>
                <Box>y</Box>
                <Box w="15.4vw">
                  <FormField
                    control={form.control}
                    name="Confirmacion.c_madrina"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            borderColor="black"
                            readOnly={modalMode === "view"}
                            placeholder="Nombre y Apellido de la Madrina"
                            {...field}
                          />
                        </FormControl>
                        <FormFieldMessage />
                      </FormItem>
                    )}
                  />
                </Box>
              </HStack>
            </VStack>
          </Box>
        </ModalBody>
        <ModalFooter>
          {modalMode === "view" ? (
            <Button colorScheme="yellow" mr={3} onClick={openPDF}>
              Ver en PDF
            </Button>
          ) : (
            <></>
          )}
          {modalMode === "view" ? (
            <Button colorScheme="green" mr={3} onClick={onClose}>
              Aceptar
            </Button>
          ) : (
            <Button
              colorScheme="orange"
              backgroundColor="rgb(238, 152, 81)"
              variant="solid"
              mr={3}
              onClick={onClose}
            >
              {modalMode === "add" ? (
                <Box>Agregar Confirmacion</Box>
              ) : (
                <Box>Aplicar Cambios</Box>
              )}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
