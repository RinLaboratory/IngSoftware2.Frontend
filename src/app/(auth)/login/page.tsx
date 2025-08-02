"use client";

import React, { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  InputRightElement,
} from "@chakra-ui/react";
import {
  FormControl,
  FormField,
  FormFieldMessage,
  FormItem,
  FormProvider,
  useForm,
} from "~/components/ui/form/form";
import { FaUserAlt, FaLock } from "react-icons/fa";
import Swal from "sweetalert2";
import type { TLogin } from "~/utils/validators";
import { LoginSchema } from "~/utils/validators";
import login from "../actions";
import { useRouter } from "next/navigation";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    schema: LoginSchema,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLoginFunction = async (values: TLogin) => {
    try {
      const response = await login(values);
      if (response) {
        router.push("/");
      } else {
        throw new Error("error");
      }
    } catch {
      await Swal.fire(
        "Error en la autenticación",
        "Credenciales incorrectas",
        "error",
      );
    }
  };

  return (
    <FormProvider {...form}>
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="gray.200"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar bg="rgb(238, 152, 81)" />
          <Heading color="rgb(238, 152, 81)">Welcome</Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<CFaUserAlt color="gray.300" />}
                        />
                        <Input type="email" placeholder="Correo" {...field} />
                      </InputGroup>
                    </FormControl>
                    <FormFieldMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          color="gray.300"
                          children={<CFaLock color="gray.300" />}
                        />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Contraseña"
                          {...field}
                        />
                        <InputRightElement width="4.5rem">
                          <Button
                            h="1.75rem"
                            size="sm"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? "Hide" : "Show"}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    <FormFieldMessage />
                  </FormItem>
                )}
              />
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                backgroundColor="rgb(238, 152, 81)"
                width="full"
                onClick={form.handleSubmit(handleLoginFunction)}
              >
                Login
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </FormProvider>
  );
}
