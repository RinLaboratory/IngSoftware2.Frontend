import z from "zod";

export const UserSchema = z.object({
  _id: z.string().regex(/^[0-9a-fA-F]{24}$/),
  name: z.string(),
  nameE: z.string(),
  lastname: z.string(),
  lastnameE: z.string(),
  email: z.string().email(),
  password_id: z.string(),
  rol: z.string(),
  phone: z.string(),
  lastSeen: z.string().optional(),
});

export type TSafeUser = z.infer<typeof UserSchema>;

export const InsertUserSchema = UserSchema.pick({
  name: true,
  lastname: true,
  email: true,
  rol: true,
  phone: true,
}).extend({
  password: z.string().optional(),
});

export type TInsertUser = z.infer<typeof InsertUserSchema>;
