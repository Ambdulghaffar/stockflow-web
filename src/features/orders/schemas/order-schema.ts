import { z } from "zod";

export const checkoutSchema = z.object({
  shippingAddress: z.string().min(5, {
    message: "L'adresse de livraison doit contenir au moins 5 caractères.",
  }),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
