import { z } from "zod";

export const supplierOrderSchema = z.object({
  supplierId: z.coerce.number().min(1, {
    message: "Veuillez sélectionner un fournisseur.",
  }),
  items: z
    .array(
      z.object({
        productId: z.coerce.number().min(1, {
          message: "Veuillez sélectionner un produit.",
        }),
        quantity: z.coerce.number().int().positive({
          message: "La quantité doit être supérieure à 0.",
        }),
        unitCost: z.coerce.number().positive({
          message: "Le coût unitaire doit être supérieur à 0.",
        }),
      }),
    )
    .min(1, {
      message: "Ajoutez au moins une ligne de commande.",
    }),
});

export type SupplierOrderFormValues = z.infer<typeof supplierOrderSchema>;