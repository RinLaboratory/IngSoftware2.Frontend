import z from "zod";

export const ParentSchema = z.object({
  _id: z.string().regex(/^[0-9a-fA-F]{24}$/),
  p_father: z.string(),
  p_mother: z.string(),
  p_phone_father: z.string(),
  p_phone_mother: z.string(),
  p_lugar: z.string(),
  p_parent_Status: z.string(),
  p_relation: z.string(),
});

export type TParent = z.infer<typeof ParentSchema>;
