import { z } from "zod";

export const stockAdjustmentSchema = z.object({
  productId: z.coerce.number().int().positive({
    message: "Veuillez sélectionner un produit.",
  }),
  type: z.enum(["RESTOCK", "DAMAGE"], {
    message: "Veuillez sélectionner un type d'ajustement.",
  }),
  quantity: z.coerce.number().int().min(1, {
    message: "La quantité doit être d'au moins 1.",
  }),
  reason: z.string().min(3, {
    message: "Le motif est obligatoire.",
  }),
});

export type StockAdjustmentFormValues = z.infer<typeof stockAdjustmentSchema>;
