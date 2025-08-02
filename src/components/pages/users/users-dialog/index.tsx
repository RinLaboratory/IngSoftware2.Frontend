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
  InputGroup,
  InputLeftElement,
  NumberInput,
  NumberInputField,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { PhoneIcon, AtSignIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Select from "react-select";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Styles from "./users-dialog.module.scss";
import * as http from "~/utils/http";
import { InsertUserSchema } from "~/utils/validators";
import type { TInsertUser, TSafeUser } from "~/utils/validators";
import type { TModalMode } from "../../sacrament-dialogs/constants";
import { modalOptions } from "../../sacrament-dialogs/constants";
import {
  FormControl,
  FormField,
  FormFieldMessage,
  FormItem,
  FormProvider,
  useForm,
} from "~/components/ui/form/form";
import type { QueryObserverResult } from "@tanstack/react-query";

const options = [
  { value: "*", label: "*" },
  { value: "SECRETARIA", label: "Secretario/a" },
  { value: "FELIGRES", label: "Feligrés" },
  { value: "NINGUNO", label: "Sin Rol" },
];
const defaultPopUpData: TInsertUser = {
  name: "",
  lastname: "",
  email: "",
  phone: "",
  rol: "NINGUNO",
  password: "",
};

interface UsersDialogProps {
  modalMode: TModalMode;
  userData?: TSafeUser;
  defaultValues?: TInsertUser;
  isOpen: boolean;
  onClose: () => void;
  refetchUsers: () => Promise<QueryObserverResult<unknown, Error>>;
}

export default function UsersDialog({
  isOpen,
  onClose,
  modalMode: _modalMode,
  defaultValues,
  userData,
  refetchUsers,
}: UsersDialogProps) {
  const toast = useToast();
  const [modalMode, setModalMode] = useState<TModalMode>(_modalMode);
  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password",
  );

  const form = useForm({
    schema: InsertUserSchema,
    defaultValues: defaultValues ?? defaultPopUpData,
  });

  const mutateUser = async (values: TInsertUser) => {
    if (modalMode === "add") {
      const response = await http.post<
        { status: true } | { status: false; msg: string }
      >("/register", values);
      if (response.status == true) {
        onClose();
        await Swal.fire(
          "Añadido",
          "El usuario ha sido agregado al sistema.",
          "success",
        );
        await refetchUsers();
      } else {
        let mensaje = "";
        if (response.msg == "email already exists") {
          mensaje = "El correo ya está registrado en el sistema.";
        }
        if (response.msg == "email or psswrd cant be blank") {
          mensaje = "El correo y/o la contraseña no pueden estar en blanco.";
        }
        if (response.msg == "cant give that rol") {
          mensaje = "El rol seleccionado es inválido.";
        }
        if (response.msg == "no perms") {
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
        ...userData,
        ...values,
      };
      const peticion = await http.put<
        { status: true } | { status: false; msg: string }
      >("/edituser", constructedData);
      if (peticion.status == true) {
        onClose();
        await Swal.fire(
          "Editado",
          "El usuario ha sido editado correctamente.",
          "success",
        );
        await refetchUsers();
      } else {
        let mensaje = "";
        if (peticion.msg == "email cant be blank") {
          mensaje = "El correo y/o la contraseña no pueden estar en blanco.";
        }
        if (peticion.msg == "user not found") {
          mensaje =
            "El usuario no se ha encontrado ¿A lo mejor lo borraste anteriormente?.";
        }
        if (peticion.msg == "cant give that rol") {
          mensaje = "El rol seleccionado es inválido.";
        }
        if (peticion.msg == "no perms") {
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

  useEffect(() => {
    if (!isOpen) form.reset(defaultPopUpData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Box>{modalOptions[modalMode]} Usuario</Box>
        </ModalHeader>
        <ModalCloseButton />
        <FormProvider {...form}>
          <ModalBody>
            <Box>
              <Box paddingBottom="1vw">
                Nombre
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input readOnly={modalMode === "view"} {...field} />
                      </FormControl>
                      <FormFieldMessage />
                    </FormItem>
                  )}
                />
              </Box>
              <Box paddingBottom="1vw">
                Apellido
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input readOnly={modalMode === "view"} {...field} />
                      </FormControl>
                      <FormFieldMessage />
                    </FormItem>
                  )}
                />
              </Box>
              <Box paddingBottom="1vw">
                Correo
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputGroup>
                          <InputLeftElement pointerEvents="none">
                            <AtSignIcon color="rgb(238, 152, 81)" />
                          </InputLeftElement>
                          <Input
                            type="email"
                            readOnly={modalMode === "view"}
                            {...field}
                          />
                        </InputGroup>
                      </FormControl>
                      <FormFieldMessage />
                    </FormItem>
                  )}
                />
              </Box>
              <Box paddingBottom="1vw">
                Numero de Teléfono
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputGroup>
                          <InputLeftElement pointerEvents="none">
                            <PhoneIcon color="rgb(238, 152, 81)" />
                          </InputLeftElement>
                          <NumberInput
                            {...field}
                            isReadOnly={modalMode === "view"}
                          >
                            <NumberInputField
                              type="tel"
                              paddingLeft="2vw"
                              {...field}
                            />
                          </NumberInput>
                        </InputGroup>
                      </FormControl>
                      <FormFieldMessage />
                    </FormItem>
                  )}
                />
              </Box>
              <Box paddingBottom="1vw">
                Rol
                <FormField
                  control={form.control}
                  name="rol"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          {...field}
                          value={
                            field.value === "*"
                              ? {
                                  label: options[0]?.label,
                                  value: options[0]?.value,
                                }
                              : field.value === "SECRETARIA"
                                ? {
                                    label: options[1]?.label,
                                    value: options[1]?.value,
                                  }
                                : field.value === "FELIGRES"
                                  ? {
                                      label: options[2]?.label,
                                      value: options[2]?.value,
                                    }
                                  : {
                                      label: options[3]?.label,
                                      value: options[3]?.value,
                                    }
                          }
                          className={Styles.select}
                          options={options}
                          onChange={(e) => form.setValue("rol", e?.value ?? "")}
                          isDisabled={modalMode === "view"}
                        />
                      </FormControl>
                      <FormFieldMessage />
                    </FormItem>
                  )}
                />
              </Box>
              <Box paddingBottom="1vw">
                Contraseña
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <HStack>
                          <Input
                            {...field}
                            type={passwordType}
                            w="14vw"
                            readOnly={modalMode === "view"}
                          />
                          <Button
                            colorScheme="orange"
                            variant="solid"
                            onClick={() => {
                              if (passwordType === "text") {
                                setPasswordType("password");
                              } else {
                                setPasswordType("text");
                              }
                            }}
                          >
                            {passwordType === "text" ? (
                              <ViewIcon color="black" />
                            ) : (
                              <ViewOffIcon color="black" />
                            )}
                          </Button>
                        </HStack>
                      </FormControl>
                      <FormFieldMessage />
                    </FormItem>
                  )}
                />
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
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
                onClick={form.handleSubmit(mutateUser)}
              >
                {modalMode === "add" ? (
                  <Box>Agregar Usuario</Box>
                ) : (
                  <Box>Aplicar Cambios</Box>
                )}
              </Button>
            )}
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </FormProvider>
      </ModalContent>
    </Modal>
  );
}
