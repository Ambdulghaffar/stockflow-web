import { z } from "zod";

export const profileInfoSchema = z.object({
  username: z.string().min(2, { message: "Le nom d'utilisateur doit contenir au moins 2 caractères." }),
  phone: z.string().optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
});
export type ProfileInfoFormValues = z.infer<typeof profileInfoSchema>;

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, { message: "Le mot de passe actuel est requis." }),
  newPassword: z.string().min(8, { message: "Le nouveau mot de passe doit contenir au moins 8 caractères." }),
  confirmPassword: z.string().min(1, { message: "Veuillez confirmer le mot de passe." }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas.",
  path: ["confirmPassword"],
});
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
