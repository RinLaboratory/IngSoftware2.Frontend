import z from "zod";

export const DocumentSchema = z.object({
  _id: z.string().regex(/^[0-9a-fA-F]{24}$/),
  n_id: z.string(),
  rut: z.string(),
  name: z.string(),
  nameE: z.string(),
  lastname: z.string(),
  lastnameE: z.string(),
  birth: z.string(),
  birthplace: z.string(),
  email: z.string(),
  Obs: z.string(),
  inscr_Date: z.string(),
  address: z.string(),
  phone: z.string(),
  Tomo: z.string(),
  Pag: z.string(),
  Referencia: z.string(),
  parent_Data: z.object({ p_id: z.string() }),
  Bautismo: z.object({ b_id: z.string() }),
  Confirmacion: z.object({ c_id: z.string() }),
  Matrimonio: z.object({ m_id: z.string() }),
});

export type TDocument = z.infer<typeof DocumentSchema>;
