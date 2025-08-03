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
  useToast,
  VStack,
  Textarea,
  Flex,
} from "@chakra-ui/react";
import Select from "react-select";
import type { SetStateAction } from "react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import * as http from "~/utils/http";
import type { TActiveDialog, TModalMode } from "../constants";
import { defaultPopUpData, modalOptions } from "../constants";
import {
  FormControl,
  FormField,
  FormFieldMessage,
  FormItem,
  FormProvider,
  useForm,
} from "~/components/ui/form/form";
import type {
  TAdjacentDocuments,
  TDocument,
  TParsedDocument,
} from "~/utils/validators";
import { ParsedDocumentSchema } from "~/utils/validators";
import BaptismDialog from "../baptism-dialog";
import ConfirmDialog from "../confirm-dialog";
import MarriageDialog from "../marriage-dialog";
import { redirect } from "next/navigation";

interface PersonDialogProps {
  activeDialog: TActiveDialog;
  setActiveDialog: (value: SetStateAction<TActiveDialog>) => void;
  modalMode: TModalMode;
  defaultValues?: TParsedDocument | undefined;
  document?: TDocument | undefined;
  adjacentDocuments?: TAdjacentDocuments;
  refetchDocuments?: () => Promise<void>;
}

const placeOptions = [
  { value: "IGLESIA_PARROQUIAL", label: "Iglesia Parroquial" },
  { value: "CAPILLA_PARROQUIAL", label: "Capilla Parroquial" },
];

export default function PersonDialog({
  activeDialog,
  setActiveDialog,
  modalMode: _modalMode,
  defaultValues,
  adjacentDocuments,
  document,
  refetchDocuments,
}: PersonDialogProps) {
  const toast = useToast();
  const [modalMode, setModalMode] = useState<TModalMode>(_modalMode);

  const form = useForm({
    schema: ParsedDocumentSchema,
    defaultValues: defaultValues ?? defaultPopUpData,
  });

  const handleDocumentSubmit = async (values: TParsedDocument) => {
    if (modalMode === "add") {
      const response = await http.post<
        { status: true } | { status: false; error: string }
      >("/documents", values);
      if (response.status === true) {
        setActiveDialog("none");
        await Swal.fire(
          "Añadido",
          "El documento ha sido agregado al sistema.",
          "success",
        );
        toast({
          title: `Atención`,
          description:
            "Para reflejar los cambios debe recargar la página o volver a realizar la consulta",
          status: "info",
          isClosable: true,
          duration: 10000,
        });
      } else {
        let mensaje = "";
        if (response.error === "document already exists") {
          mensaje = "El documento ya está registrado en el sistema.";
        }
        if (response.error === "name and lastname cant be blank") {
          mensaje = "El Nombre y el Apellido no pueden estar en blanco.";
        }
        if (response.error === "no perms") {
          mensaje = "No tienes permisos suficientes para esto.";
        }
        toast({
          title: `Error`,
          description: mensaje,
          status: "error",
          isClosable: true,
          duration: 10000,
        });
      }
    } else {
      const constructedData = {
        ...values,
        Documento: {
          ...document,
          ...values.Documento,
        },
        parent_Data: {
          ...adjacentDocuments?.parent_Data,
          ...values.parent_Data,
        },
        Bautismo: {
          ...adjacentDocuments?.Bautismo,
          ...values.Bautismo,
        },
        Confirmacion: {
          ...adjacentDocuments?.Confirmacion,
          ...values.Confirmacion,
        },
        Matrimonio: {
          ...adjacentDocuments?.Matrimonio,
          ...values.Matrimonio,
        },
      };
      const response = await http.put<
        { status: true } | { status: false; error: string }
      >("/documents", constructedData);
      if (response.status == true) {
        setActiveDialog("none");
        await Swal.fire(
          "Editado",
          "El documento ha sido editado correctamente.",
          "success",
        );
        if (refetchDocuments) {
          await refetchDocuments();
        }
      } else {
        let mensaje = "";
        if (response.error == "name and lastname cant be blank") {
          mensaje = "El Nombre y el Apellido no pueden estar en blanco.";
        }
        if (response.error == "no perms") {
          mensaje = "No tienes permisos suficientes para esto.";
        }
        toast({
          title: `Error`,
          description: mensaje,
          status: "error",
          isClosable: true,
          duration: 10000,
        });
      }
    }
  };

  const openPDF = () => {
    redirect(`/export/baptism?&documentId=${document?._id ?? ""}`);
  };

  useEffect(() => {
    if (activeDialog === "none") {
      form.reset(defaultPopUpData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDialog]);

  return (
    <>
      <FormProvider {...form}>
        <Modal
          isOpen={activeDialog === "persona"}
          onClose={() => setActiveDialog("none")}
          size="5xl"
        >
          <ModalOverlay />
          <ModalContent maxH="400vw" maxW="73vw">
            <ModalHeader>
              <Box>{modalOptions[modalMode]} Documento</Box>
            </ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              {/* {!loading ? ( */}
              <Flex flexDir="row">
                <Box w="25%">
                  <VStack paddingTop="1vw" alignItems="initial">
                    <HStack>
                      <Box w="1.5vw">N°</Box>
                      <Box w="7vw">
                        <FormField
                          control={form.control}
                          name="Documento.n_id"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  borderColor="black"
                                  placeholder="001/2022"
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
                    <Box paddingTop="0.5vw">
                      <Button
                        colorScheme="orange"
                        variant="solid"
                        onClick={() => setActiveDialog("bautismo")}
                      >
                        <Box>{modalOptions[modalMode]} Bautismo</Box>
                      </Button>
                    </Box>
                    <Box padding=".8vw 0 .8vw 0">
                      <Button
                        colorScheme="orange"
                        variant="solid"
                        onClick={() => setActiveDialog("confirmacion")}
                      >
                        <Box>{modalOptions[modalMode]} Confirmación</Box>
                      </Button>
                    </Box>
                    <Box>
                      <Button
                        colorScheme="orange"
                        variant="solid"
                        onClick={() => setActiveDialog("matrimonio")}
                      >
                        <Box>{modalOptions[modalMode]} Matrimonio</Box>
                      </Button>
                    </Box>
                    <Box w="12vw">Otras Notas:</Box>
                    <Box w="full">
                      <FormField
                        control={form.control}
                        name="Documento.Obs"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                borderColor="black"
                                readOnly={modalMode === "view"}
                                {...field}
                              />
                            </FormControl>
                            <FormFieldMessage />
                          </FormItem>
                        )}
                      />
                    </Box>
                    <HStack padding="1vw 0 1vw 0">
                      <Box>Libro Tomo</Box>
                      <FormField
                        control={form.control}
                        name="Documento.Tomo"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                w="5vw"
                                borderColor="black"
                                placeholder="1"
                                readOnly={modalMode === "view"}
                                {...field}
                              />
                            </FormControl>
                            <FormFieldMessage />
                          </FormItem>
                        )}
                      />
                      <Box>Página:</Box>
                      <FormField
                        control={form.control}
                        name="Documento.Pag"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                w="5vw"
                                borderColor="black"
                                placeholder="35"
                                readOnly={modalMode === "view"}
                                {...field}
                              />
                            </FormControl>
                            <FormFieldMessage />
                          </FormItem>
                        )}
                      />
                    </HStack>
                    <HStack>
                      <Box w="14vw">Anotado en el índice pág.</Box>
                      <FormField
                        control={form.control}
                        name="Documento.Referencia"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                w="5vw"
                                borderColor="black"
                                placeholder="1"
                                readOnly={modalMode === "view"}
                                {...field}
                              />
                            </FormControl>
                            <FormFieldMessage />
                          </FormItem>
                        )}
                      />
                    </HStack>
                  </VStack>
                </Box>
                <Box h="30vw" w="1px" mx="2rem" backgroundColor="gray" />
                <Box w="45vw">
                  <HStack w="full">
                    <Box w="7rem">En la</Box>
                    <FormField
                      control={form.control}
                      name="Bautismo.b_place1"
                      render={({ field }) => (
                        <FormItem w="16rem">
                          <FormControl>
                            <Box
                              w="16rem"
                              h="auto"
                              borderColor="black"
                              border="1px"
                              borderRadius="5px"
                            >
                              <Select
                                {...field}
                                value={
                                  field.value === "IGLESIA_PARROQUIAL"
                                    ? {
                                        label: placeOptions[0]?.label,
                                        value: placeOptions[0]?.value,
                                      }
                                    : {
                                        label: placeOptions[1]?.label,
                                        value: placeOptions[1]?.value,
                                      }
                                }
                                onChange={(e) =>
                                  form.setValue("Bautismo.b_place1", e?.value)
                                }
                                options={placeOptions}
                                isDisabled={modalMode === "view"}
                              />
                            </Box>
                          </FormControl>
                          <FormFieldMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="Bautismo.b_place2"
                      render={({ field }) => (
                        <FormItem w="full">
                          <FormControl>
                            <Input
                              w="full"
                              borderColor="black"
                              placeholder="Santo Toribio"
                              readOnly={modalMode === "view"}
                              {...field}
                            />
                          </FormControl>
                          <FormFieldMessage />
                        </FormItem>
                      )}
                    />
                    <Box>el</Box>
                    <FormField
                      control={form.control}
                      name="Bautismo.b_date"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              w="12vw"
                              borderColor="black"
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
                  </HStack>
                  <HStack paddingTop="1vw" w="full">
                    <Box w="17rem">bautizó y puso óleo y crisma</Box>
                    <FormField
                      control={form.control}
                      name="Bautismo.b_father"
                      render={({ field }) => (
                        <FormItem w="full">
                          <FormControl>
                            <Input
                              w="full"
                              borderColor="black"
                              placeholder="Nombre y Apellido del Ministro"
                              readOnly={modalMode === "view"}
                              {...field}
                            />
                          </FormControl>
                          <FormFieldMessage />
                        </FormItem>
                      )}
                    />
                  </HStack>
                  <HStack paddingTop="1vw" gap="1rem" maxW="full">
                    <Box w=".5vw">a</Box>
                    <FormField
                      control={form.control}
                      name="Documento.name"
                      render={({ field }) => (
                        <FormItem w="full">
                          <FormControl>
                            <Input
                              w="full"
                              borderColor="black"
                              placeholder="Nombre del Bautizado"
                              readOnly={modalMode === "view"}
                              {...field}
                            />
                          </FormControl>
                          <FormFieldMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="Documento.lastname"
                      render={({ field }) => (
                        <FormItem w="full">
                          <FormControl>
                            <Input
                              w="full"
                              borderColor="black"
                              placeholder="Apellido del Bautizado"
                              readOnly={modalMode === "view"}
                              {...field}
                            />
                          </FormControl>
                          <FormFieldMessage />
                        </FormItem>
                      )}
                    />
                  </HStack>
                  <HStack paddingTop="1vw" w="full">
                    <Box w="10rem">que nació en</Box>
                    <FormField
                      control={form.control}
                      name="Documento.birthplace"
                      render={({ field }) => (
                        <FormItem w="full">
                          <FormControl>
                            <Input
                              w="full"
                              borderColor="black"
                              placeholder="Lugar de Nacimiento"
                              readOnly={modalMode === "view"}
                              {...field}
                            />
                          </FormControl>
                          <FormFieldMessage />
                        </FormItem>
                      )}
                    />
                    <Box w="1vw">el</Box>
                    <FormField
                      control={form.control}
                      name="Documento.birth"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              w="12vw"
                              borderColor="black"
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
                  </HStack>
                  <HStack
                    paddingTop="1vw"
                    w="full"
                    justifyContent="end"
                    alignItems="center"
                  >
                    <Box>R.U.T.:</Box>
                    <FormField
                      control={form.control}
                      name="Documento.rut"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              w="13vw"
                              borderColor="black"
                              placeholder="12.345.678-9"
                              readOnly={modalMode === "view"}
                              {...field}
                            />
                          </FormControl>
                          <FormFieldMessage />
                        </FormItem>
                      )}
                    />
                  </HStack>
                  <HStack paddingTop="1vw" w="full">
                    <Box w="2rem">hijo</Box>
                    <FormField
                      control={form.control}
                      name="parent_Data.p_relation"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              w="8vw"
                              borderColor="black"
                              placeholder="Relacion"
                              readOnly={modalMode === "view"}
                              {...field}
                            />
                          </FormControl>
                          <FormFieldMessage />
                        </FormItem>
                      )}
                    />
                    <Box w="2rem">de</Box>
                    <FormField
                      control={form.control}
                      name="parent_Data.p_father"
                      render={({ field }) => (
                        <FormItem w="full">
                          <FormControl>
                            <Input
                              w="full"
                              borderColor="black"
                              placeholder="Nombre y Apellido del Papá"
                              readOnly={modalMode === "view"}
                              {...field}
                            />
                          </FormControl>
                          <FormFieldMessage />
                        </FormItem>
                      )}
                    />
                  </HStack>
                  <HStack paddingTop="1vw" w="full">
                    <Box w="3rem">y de</Box>
                    <FormField
                      control={form.control}
                      name="parent_Data.p_mother"
                      render={({ field }) => (
                        <FormItem w="full">
                          <FormControl>
                            <Input
                              w="full"
                              borderColor="black"
                              placeholder="Nombre y Apellido de la Mamá"
                              readOnly={modalMode === "view"}
                              {...field}
                            />
                          </FormControl>
                          <FormFieldMessage />
                        </FormItem>
                      )}
                    />
                  </HStack>
                  <HStack paddingTop="1vw" w="full">
                    <Box>Padrinos:</Box>
                    <FormField
                      control={form.control}
                      name="Bautismo.b_padrino"
                      render={({ field }) => (
                        <FormItem w="full">
                          <FormControl>
                            <Input
                              w="full"
                              borderColor="black"
                              placeholder="Nombre y Apellido del Padrino"
                              readOnly={modalMode === "view"}
                              {...field}
                            />
                          </FormControl>
                          <FormFieldMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="Bautismo.b_madrina"
                      render={({ field }) => (
                        <FormItem w="full">
                          <FormControl>
                            <Input
                              w="full"
                              borderColor="black"
                              placeholder="Nombre y Apellido de la Madrina"
                              readOnly={modalMode === "view"}
                              {...field}
                            />
                          </FormControl>
                          <FormFieldMessage />
                        </FormItem>
                      )}
                    />
                  </HStack>
                </Box>
              </Flex>
              {/* ) : (
              <Box padding="15% 0 15% 48%">
                <Spinner size="xl" thickness="4px" color="blue.500" />
              </Box>
            )} */}
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
                <Button
                  colorScheme="green"
                  variant="solid"
                  mr={3}
                  onClick={() => setModalMode("edit")}
                >
                  Editar
                </Button>
              ) : (
                <Button
                  colorScheme="orange"
                  backgroundColor="rgb(238, 152, 81)"
                  variant="solid"
                  mr={3}
                  onClick={form.handleSubmit(handleDocumentSubmit)}
                >
                  {modalMode === "add" ? (
                    <Box>Agregar Documento</Box>
                  ) : (
                    <Box>Aplicar Cambios</Box>
                  )}
                </Button>
              )}
              <Button
                colorScheme="red"
                mr={3}
                onClick={() => setActiveDialog("none")}
              >
                Cerrar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <BaptismDialog
          modalMode={modalMode}
          form={form}
          isOpen={activeDialog === "bautismo"}
          onClose={() => setActiveDialog("persona")}
        />
        <ConfirmDialog
          modalMode={modalMode}
          form={form}
          isOpen={activeDialog === "confirmacion"}
          onClose={() => setActiveDialog("persona")}
          documentId={document?._id}
        />
        <MarriageDialog
          modalMode={modalMode}
          form={form}
          isOpen={activeDialog === "matrimonio"}
          onClose={() => setActiveDialog("persona")}
          documentId={document?._id}
        />
      </FormProvider>
    </>
  );
}
