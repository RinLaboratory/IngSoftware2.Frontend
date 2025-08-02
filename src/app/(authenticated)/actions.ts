"use server";

import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { env } from "~/env/shared";
import * as http from "~/utils/http";

export async function getAccountInfo(): Promise<unknown> {
  const cookieStore = await cookies();

  const isTokenAvailable = !!cookieStore.get("jwt")?.value;

  if (!isTokenAvailable) return;

  try {
    throw new Error("not implemented");
    const userData = await http.get<undefined>(`/users/current`);
    return userData;
  } catch {
    return undefined;
  }
}

export async function verifySession() {
  const cookieStore = await cookies();

  const token = cookieStore.get("jwt")?.value;
  if (!token) return undefined;

  try {
    verify(token, env.JWT_SECRET);
    return true;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
