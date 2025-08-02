import z from "zod";

export const ConfirmSchema = z.object({
  _id: z.string().regex(/^[0-9a-fA-F]{24}$/),
  c_place1: z.string(),
  c_place2: z.string(),
  c_date: z.string(),
  c_father: z.string(),
  c_padrino: z.string(),
  c_madrina: z.string(),
});

export type TConfirm = z.infer<typeof ConfirmSchema>;
