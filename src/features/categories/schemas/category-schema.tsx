import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Le nom de la catégorie doit contenir au moins 2 caractères.",
    })
    .max(100, {
      message: "Le nom de la catégorie ne doit pas dépasser 100 caractères.",
    }),
  description: z.string().max(500, {
    message: "La description ne doit pas dépasser 500 caractères.",
  }),
  imageUrl: z
    .string()
    .url({
      message: "Veuillez entrer une URL valide.",
    })
    .optional()
    .or(z.literal("")),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
