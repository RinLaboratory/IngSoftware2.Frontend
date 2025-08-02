import z from "zod";

export const BaptismSchema = z.object({
  _id: z.string().regex(/^[0-9a-fA-F]{24}$/),
  b_place1: z.string(),
  b_place2: z.string(),
  b_date: z.string(),
  b_father: z.string(),
  b_padrino: z.string(),
  b_padrino_data: z.object({
    older: z.boolean(),
    bautizado: z.boolean(),
    p_comunion: z.boolean(),
    confirmado: z.boolean(),
    casado: z.boolean(),
    casado_iglesia: z.boolean(),
  }),
  b_madrina: z.string(),
  b_madrina_data: z.object({
    older: z.boolean(),
    bautizado: z.boolean(),
    p_comunion: z.boolean(),
    confirmado: z.boolean(),
    casado: z.boolean(),
    casado_iglesia: z.boolean(),
  }),
});

export type TBaptism = z.infer<typeof BaptismSchema>;
