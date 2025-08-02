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
import { CheckIcon } from "@chakra-ui/icons";
import type { TParsedDocument } from "~/utils/validators";
import type { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormFieldMessage,
  FormItem,
} from "~/components/ui/form/form";
import type { TModalMode } from "../constants";
import { modalOptions } from "../constants";

interface BaptismDialogProps {
  form: UseFormReturn<TParsedDocument, unknown, TParsedDocument>;
  isOpen: boolean;
  onClose: () => void;
  modalMode: TModalMode;
}

export default function BaptismDialog({
  isOpen,
  onClose,
  modalMode,
  form,
}: BaptismDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent maxH="400vw" maxW="48vw">
        <ModalHeader>
          <Box>{modalOptions[modalMode]} Bautismo</Box>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <VStack alignItems="initial">
              <HStack>
                <Box w="11vw">Nombre del Padre</Box>
                <Box w="40vw">
                  <FormField
                    control={form.control}
                    name="parent_Data.p_father"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
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
                </Box>
              </HStack>
              <HStack>
                <Box w="11vw">Nombre de la Madre</Box>
                <Box w="40vw">
                  <FormField
                    control={form.control}
                    name="parent_Data.p_mother"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
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
                </Box>
              </HStack>
              <HStack>
                <Box w="11vw">Dirección</Box>
                <Box w="40vw">
                  <FormField
                    control={form.control}
                    name="Documento.address"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Direccion de la residencia del Bautizado"
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
              </HStack>
              <HStack>
                <Box w="16.3vw">Teléfono</Box>
                <Box>
                  <FormField
                    control={form.control}
                    name="Documento.phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Telefono de contacto del Bautizado"
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
                <Box>Celular Padre</Box>
                <Box>
                  <FormField
                    control={form.control}
                    name="parent_Data.p_phone_father"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Telefono de contacto del Papá"
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
                <Box>Celular Madre</Box>
                <Box>
                  <FormField
                    control={form.control}
                    name="parent_Data.p_phone_mother"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Telefono de contacto de la Mamá"
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
              </HStack>
            </VStack>
            <Box backgroundColor="gray" h="1px" w="45vw" margin="1vw 0 1vw 0" />
            <VStack alignItems="initial">
              <HStack>
                <Box w="10vw">Padres casados por la iglesia</Box>
                <Box w="2vw">
                  <FormField
                    control={form.control}
                    name="parent_Data.p_parent_Status"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Button
                            {...field}
                            colorScheme="teal"
                            variant="outline"
                            w="1vw"
                            isDisabled={modalMode === "view"}
                            onClick={() =>
                              form.setValue(
                                "parent_Data.p_parent_Status",
                                "IGLESIA",
                              )
                            }
                          >
                            {field.value === "IGLESIA" ? (
                              <CheckIcon color="black" />
                            ) : (
                              <></>
                            )}
                          </Button>
                        </FormControl>
                        <FormFieldMessage />
                      </FormItem>
                    )}
                  />
                </Box>
                <Box w="6vw" paddingLeft="1vw">
                  Parroquia
                </Box>
                <Box w="40vw">
                  <FormField
                    control={form.control}
                    name="parent_Data.p_lugar"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Santo Toribio"
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
              </HStack>
              <HStack paddingTop="1vw">
                <Box w="15vw">Padres casados solo por el Civil</Box>
                <Box w="2vw">
                  <FormField
                    control={form.control}
                    name="parent_Data.p_parent_Status"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Button
                            colorScheme="teal"
                            variant="outline"
                            w="1vw"
                            isDisabled={modalMode === "view"}
                            {...field}
                            onClick={() =>
                              form.setValue(
                                "parent_Data.p_parent_Status",
                                "CIVIL",
                              )
                            }
                          >
                            {field.value === "CIVIL" ? (
                              <CheckIcon color="black" />
                            ) : (
                              <></>
                            )}
                          </Button>
                        </FormControl>
                        <FormFieldMessage />
                      </FormItem>
                    )}
                  />
                </Box>
                <Box w="17vw" paddingLeft="2vw">
                  Padres Actualmente Separados
                </Box>
                <Box w="2vw">
                  <FormField
                    control={form.control}
                    name="parent_Data.p_parent_Status"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Button
                            colorScheme="teal"
                            variant="outline"
                            w="1vw"
                            isDisabled={modalMode === "view"}
                            {...field}
                            onClick={() =>
                              form.setValue(
                                "parent_Data.p_parent_Status",
                                "SEPARADOS",
                              )
                            }
                          >
                            {field.value === "SEPARADOS" ? (
                              <CheckIcon color="black" />
                            ) : (
                              <></>
                            )}
                          </Button>
                        </FormControl>
                        <FormFieldMessage />
                      </FormItem>
                    )}
                  />
                </Box>
              </HStack>
              <HStack paddingTop="1vw">
                <Box w="16vw">Padres separados y vueltos a casar</Box>
                <Box w="2vw">
                  <FormField
                    control={form.control}
                    name="parent_Data.p_parent_Status"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Button
                            colorScheme="teal"
                            variant="outline"
                            w="1vw"
                            isDisabled={modalMode === "view"}
                            {...field}
                            onClick={() =>
                              form.setValue(
                                "parent_Data.p_parent_Status",
                                "SEPARADOS_CASADOS",
                              )
                            }
                          >
                            {field.value === "SEPARADOS_CASADOS" ? (
                              <CheckIcon color="black" />
                            ) : (
                              <></>
                            )}
                          </Button>
                        </FormControl>
                        <FormFieldMessage />
                      </FormItem>
                    )}
                  />
                </Box>
                <Box w="11vw" paddingLeft="2vw">
                  Padres no casados
                </Box>
                <Box w="2vw">
                  <FormField
                    control={form.control}
                    name="parent_Data.p_parent_Status"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Button
                            colorScheme="teal"
                            variant="outline"
                            w="1vw"
                            isDisabled={modalMode === "view"}
                            {...field}
                            onClick={() =>
                              form.setValue(
                                "parent_Data.p_parent_Status",
                                "NO_CASADOS",
                              )
                            }
                          >
                            {field.value === "NO_CASADOS" ? (
                              <CheckIcon color="black" />
                            ) : (
                              <></>
                            )}
                          </Button>
                        </FormControl>
                        <FormFieldMessage />
                      </FormItem>
                    )}
                  />
                </Box>
                <Box w="9vw" paddingLeft="2vw">
                  Madre soltera
                </Box>
                <Box w="2vw">
                  <FormField
                    control={form.control}
                    name="parent_Data.p_parent_Status"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Button
                            colorScheme="teal"
                            variant="outline"
                            w="1vw"
                            isDisabled={modalMode === "view"}
                            {...field}
                            onClick={() =>
                              form.setValue(
                                "parent_Data.p_parent_Status",
                                "SOLTERA",
                              )
                            }
                          >
                            {field.value === "SOLTERA" ? (
                              <CheckIcon color="black" />
                            ) : (
                              <></>
                            )}
                          </Button>
                        </FormControl>
                        <FormFieldMessage />
                      </FormItem>
                    )}
                  />
                </Box>
              </HStack>
            </VStack>
            <Box backgroundColor="gray" h="1px" w="45vw" margin="1vw 0 1vw 0" />
            <VStack alignItems="initial" fontSize=".8vw">
              <HStack fontSize="1vw">
                <Box w="12vw">Nombre del Padrino</Box>
                <Box w="40vw">
                  <FormField
                    control={form.control}
                    name="Bautismo.b_padrino"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Nombre y Apellido del Padrino"
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
              </HStack>
              <HStack paddingTop="1vw">
                <Box w="10vw">Mayor de 16 años</Box>
                <Box w="2vw">
                  <FormField
                    control={form.control}
                    name="Bautismo.b_padrino_data.older"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Button
                            colorScheme="teal"
                            variant="outline"
                            w="1vw"
                            isDisabled={modalMode === "view"}
                            onClick={() =>
                              form.setValue(
                                "Bautismo.b_padrino_data.older",
                                !field.value,
                              )
                            }
                          >
                            {field.value === true ? (
                              <CheckIcon color="black" />
                            ) : (
                              <></>
                            )}
                          </Button>
                        </FormControl>
                        <FormFieldMessage />
                      </FormItem>
                    )}
                  />
                </Box>
                <Box w="11vw" paddingLeft="1vw">
                  Bautizado Católico
                </Box>
                <Box w="2vw">
                  <FormField
                    control={form.control}
                    name="Bautismo.b_padrino_data.bautizado"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Button
                            colorScheme="teal"
                            variant="outline"
                            w="1vw"
                            isDisabled={modalMode === "view"}
                            onClick={() =>
                              form.setValue(
                                "Bautismo.b_padrino_data.bautizado",
                                !field.value,
                              )
                            }
                          >
                            {field.value === true ? (
                              <CheckIcon color="black" />
                            ) : (
                              <></>
                            )}
                          </Button>
                        </FormControl>
                        <FormFieldMessage />
                      </FormItem>
                    )}
                  />
                </Box>
                <Box w="11vw" paddingLeft="1vw">
                  Primera Comunión
                </Box>
                <Box w="2vw">
                  <FormField
                    control={form.control}
                    name="Bautismo.b_padrino_data.p_comunion"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Button
                            colorScheme="teal"
                            variant="outline"
                            w="1vw"
                            isDisabled={modalMode === "view"}
                            onClick={() =>
                              form.setValue(
                                "Bautismo.b_padrino_data.p_comunion",
                                !field.value,
                              )
                            }
                          >
                            {field.value === true ? (
                              <CheckIcon color="black" />
                            ) : (
                              <></>
                            )}
                          </Button>
                        </FormControl>
                        <FormFieldMessage />
                      </FormItem>
                    )}
                  />
                </Box>
                <Box w="11vw" paddingLeft="1vw">
                  Confirmado
                </Box>
                <Box w="2vw">
                  <FormField
                    control={form.control}
                    name="Bautismo.b_padrino_data.confirmado"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Button
                            colorScheme="teal"
                            variant="outline"
                            w="1vw"
                            isDisabled={modalMode === "view"}
                            onClick={() =>
                              form.setValue(
                                "Bautismo.b_padrino_data.confirmado",
                                !field.value,
                              )
                            }
                          >
                            {field.value === true ? (
                              <CheckIcon color="black" />
                            ) : (
                              <></>
                            )}
                          </Button>
                        </FormControl>
                        <FormFieldMessage />
                      </FormItem>
                    )}
                  />
                </Box>
                <Box w="8vw" paddingLeft="1vw">
                  Casado
                </Box>
                <Box w="2vw">
                  <FormField
                    control={form.control}
                    name="Bautismo.b_padrino_data.casado"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Button
                            colorScheme="teal"
                            variant="outline"
                            w="1vw"
                            isDisabled={modalMode === "view"}
                            onClick={() =>
                              form.setValue(
                                "Bautismo.b_padrino_data.casado",
                                !field.value,
                              )
                            }
                          >
                            {field.value === true ? (
                              <CheckIcon color="black" />
                            ) : (
                              <></>
                            )}
                          </Button>
                        </FormControl>
                        <FormFieldMessage />
                      </FormItem>
                    )}
                  />
                </Box>
                <Box w="8vw" paddingLeft="1vw">
                  Casado por la Iglesia
                </Box>
                <Box w="2vw">
                  <FormField
                    control={form.control}
                    name="Bautismo.b_padrino_data.casado_iglesia"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Button
                            colorScheme="teal"
                            variant="outline"
                            w="1vw"
                            isDisabled={modalMode === "view"}
                            onClick={() =>
                              form.setValue(
                                "Bautismo.b_padrino_data.casado_iglesia",
                                !field.value,
                              )
                            }
                          >
                            {field.value === true ? (
                              <CheckIcon color="black" />
                            ) : (
                              <></>
                            )}
                          </Button>
                        </FormControl>
                        <FormFieldMessage />
                      </FormItem>
                    )}
                  />
                </Box>
              </HStack>
            </VStack>
            <VStack alignItems="initial" fontSize=".8vw" paddingTop="1vw">
              <HStack fontSize="1vw">
                <Box w="12vw">Nombre de la Madrina</Box>
                <Box w="40vw">
                  <FormField
                    control={form.control}
                    name="Bautismo.b_madrina"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Nombre y Apellido de la Madrina"
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
              </HStack>
              <HStack paddingTop="1vw">
                <Box w="10vw">Mayor de 16 años</Box>
                <Box w="2vw">
                  <FormField
                    control={form.control}
                    name="Bautismo.b_madrina_data.older"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Button
                            colorScheme="teal"
                            variant="outline"
                            w="1vw"
                            isDisabled={modalMode === "view"}
                            onClick={() =>
                              form.setValue(
                                "Bautismo.b_madrina_data.older",
                                !field.value,
                              )
                            }
                          >
                            {field.value === true ? (
                              <CheckIcon color="black" />
                            ) : (
                              <></>
                            )}
                          </Button>
                        </FormControl>
                        <FormFieldMessage />
                      </FormItem>
                    )}
                  />
                </Box>
                <Box w="11vw" paddingLeft="1vw">
                  Bautizado Católico
                </Box>
                <Box w="2vw">
                  <FormField
                    control={form.control}
                    name="Bautismo.b_madrina_data.bautizado"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Button
                            colorScheme="teal"
                            variant="outline"
                            w="1vw"
                            isDisabled={modalMode === "view"}
                            onClick={() =>
                              form.setValue(
                                "Bautismo.b_madrina_data.bautizado",
                                !field.value,
                              )
                            }
                          >
                            {field.value === true ? (
                              <CheckIcon color="black" />
                            ) : (
                              <></>
                            )}
                          </Button>
                        </FormControl>
                        <FormFieldMessage />
                      </FormItem>
                    )}
                  />
                </Box>
                <Box w="11vw" paddingLeft="1vw">
                  Primera Comunión
                </Box>
                <Box w="2vw">
                  <FormField
                    control={form.control}
                    name="Bautismo.b_madrina_data.p_comunion"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Button
                            colorScheme="teal"
                            variant="outline"
                            w="1vw"
                            isDisabled={modalMode === "view"}
                            onClick={() =>
                              form.setValue(
                                "Bautismo.b_madrina_data.p_comunion",
                                !field.value,
                              )
                            }
                          >
                            {field.value === true ? (
                              <CheckIcon color="black" />
                            ) : (
                              <></>
                            )}
                          </Button>
                        </FormControl>
                        <FormFieldMessage />
                      </FormItem>
                    )}
                  />
                </Box>
                <Box w="11vw" paddingLeft="1vw">
                  Confirmado
                </Box>
                <Box w="2vw">
                  <FormField
                    control={form.control}
                    name="Bautismo.b_madrina_data.confirmado"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Button
                            colorScheme="teal"
                            variant="outline"
                            w="1vw"
                            isDisabled={modalMode === "view"}
                            onClick={() =>
                              form.setValue(
                                "Bautismo.b_madrina_data.confirmado",
                                !field.value,
                              )
                            }
                          >
                            {field.value === true ? (
                              <CheckIcon color="black" />
                            ) : (
                              <></>
                            )}
                          </Button>
                        </FormControl>
                        <FormFieldMessage />
                      </FormItem>
                    )}
                  />
                </Box>
                <Box w="8vw" paddingLeft="1vw">
                  Casado
                </Box>
                <Box w="2vw">
                  <FormField
                    control={form.control}
                    name="Bautismo.b_madrina_data.casado"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Button
                            colorScheme="teal"
                            variant="outline"
                            w="1vw"
                            isDisabled={modalMode === "view"}
                            onClick={() =>
                              form.setValue(
                                "Bautismo.b_madrina_data.casado",
                                !field.value,
                              )
                            }
                          >
                            {field.value === true ? (
                              <CheckIcon color="black" />
                            ) : (
                              <></>
                            )}
                          </Button>
                        </FormControl>
                        <FormFieldMessage />
                      </FormItem>
                    )}
                  />
                </Box>
                <Box w="8vw" paddingLeft="1vw">
                  Casado por la Iglesia
                </Box>
                <Box w="2vw">
                  <FormField
                    control={form.control}
                    name="Bautismo.b_madrina_data.casado_iglesia"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Button
                            colorScheme="teal"
                            variant="outline"
                            w="1vw"
                            isDisabled={modalMode === "view"}
                            onClick={() =>
                              form.setValue(
                                "Bautismo.b_madrina_data.casado_iglesia",
                                !field.value,
                              )
                            }
                          >
                            {field.value === true ? (
                              <CheckIcon color="black" />
                            ) : (
                              <></>
                            )}
                          </Button>
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
                <Box>Agregar Bautismo</Box>
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
