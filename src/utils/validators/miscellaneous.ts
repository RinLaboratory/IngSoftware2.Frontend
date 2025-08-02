import z from "zod";
import { DocumentSchema } from "./documento";
import type { TParent } from "./parent";
import { ParentSchema } from "./parent";
import type { TBaptism } from "./bautismo";
import { BaptismSchema } from "./bautismo";
import type { TConfirm } from "./confirmacion";
import { ConfirmSchema } from "./confirmacion";
import type { TMarriage } from "./matrimonio";
import { MarriageSchema } from "./matrimonio";
import isObjectEffectivelyEmpty from "../check-if-object-is-empty";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type TLogin = z.infer<typeof LoginSchema>;

// WHAT THE ACTUAL FUCK IS THIS
export const ParsedDocumentSchema = z
  .object({
    Documento: DocumentSchema.omit({
      _id: true,
      nameE: true,
      lastnameE: true,
      Bautismo: true,
      Confirmacion: true,
      Matrimonio: true,
      parent_Data: true,
    }),
    A_parent: z.boolean(),
    parent_Data: ParentSchema.omit({ _id: true }).partial(),
    A_bautismo: z.boolean(),
    Bautismo: BaptismSchema.omit({ _id: true }).partial(),
    A_confirmacion: z.boolean(),
    Confirmacion: ConfirmSchema.omit({ _id: true }).partial(),
    A_matrimonio: z.boolean(),
    Matrimonio: MarriageSchema.omit({ _id: true }).partial(),
  })
  .transform((data) => {
    return {
      ...data,
      A_parent: !isObjectEffectivelyEmpty(data.parent_Data),
      A_bautismo: !isObjectEffectivelyEmpty(data.Bautismo),
      A_confirmacion: !isObjectEffectivelyEmpty(data.Confirmacion),
      A_matrimonio: !isObjectEffectivelyEmpty(data.Matrimonio),
    };
  });

export type TParsedDocument = z.infer<typeof ParsedDocumentSchema>;

export type SelectValue =
  | "default"
  | "exportPackage"
  | "ID"
  | "FECHAINSCRIPCION"
  | "NOMBRE"
  | "APELLIDO";

export type OrderBy =
  | "NOMBRE"
  | "APELLIDO"
  | "MAS_ANTIGUO"
  | "MAS_RECIENTE"
  | "";

export interface QueryDocuments {
  search: string;
  selectValue: SelectValue;
  orderBy: OrderBy;
  bautismo: boolean;
  confirmacion: boolean;
  matrimonio: boolean;
}

export interface TAdjacentDocuments {
  Bautismo: TBaptism;
  Matrimonio: TMarriage | undefined;
  Confirmacion: TConfirm | undefined;
  parent_Data: TParent | undefined;
}
