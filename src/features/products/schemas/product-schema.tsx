import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Le nom du produit doit contenir au moins 2 caractères.",
    })
    .max(200, {
      message: "Le nom du produit ne doit pas dépasser 200 caractères.",
    }),
  description: z
    .string()
    .max(1000, {
      message: "La description ne doit pas dépasser 1000 caractères.",
    })
    .optional(),
  price: z.coerce.number().positive({
    message: "Le prix doit être supérieur à 0.",
  }),
  stock: z.coerce
    .number()
    .int({
      message: "Le stock doit être un nombre entier.",
    })
    .min(0, {
      message: "Le stock ne peut pas être négatif.",
    }),
  imageUrl: z
    .string()
    .url({
      message: "Veuillez entrer une URL valide.",
    })
    .optional()
    .or(z.literal("")),
  categoryId: z.coerce.number().min(1, {
    message: "Veuillez sélectionner une catégorie.",
  }),
  status: z.enum(["ACTIVE", "INACTIVE", "OUT_OF_STOCK"], {
    message: "Veuillez sélectionner un statut.",
  }),
});

export type ProductFormValues = z.infer<typeof productSchema>;
