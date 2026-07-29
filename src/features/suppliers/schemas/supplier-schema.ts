import { z } from "zod";

export const supplierSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Le nom du fournisseur doit contenir au moins 2 caractères.",
    })
    .max(100, {
      message: "Le nom du fournisseur ne doit pas dépasser 100 caractères.",
    }),
  contactName: z.string().optional().or(z.literal("")),
  email: z
    .string()
    .email({
      message: "Veuillez entrer une adresse e-mail valide.",
    })
    .optional()
    .or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
});

export type SupplierFormValues = z.infer<typeof supplierSchema>;