// features/users/schemas/user.schema.ts
import { z } from "zod";

const baseSchema = z.object({
  username: z.string().min(2, {
    message: "Le nom d'utilisateur doit contenir au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  phone: z.string().min(10, {
    message: "Le numéro de téléphone doit contenir au moins 10 chiffres.",
  }).regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, {
    message: "Veuillez entrer un numéro de téléphone valide.",
  }),
  address: z.string().min(2, {
    message: "L'adresse doit contenir au moins 2 caractères.",
  }),
  role: z.enum(["ADMIN", "MANAGER", "CLIENT"]),
});

// Schema create — avec password
export const createUserSchema = baseSchema.extend({
  password: z.string().min(8, {
    message: "Le mot de passe doit contenir au moins 8 caractères.",
  }),
});

// Schema edit — sans password
export const updateUserSchema = baseSchema;

export type CreateUserFormValues = z.infer<typeof createUserSchema>;
export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;