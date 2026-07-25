"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createUserSchema,
  updateUserSchema,
  CreateUserFormValues,
  UpdateUserFormValues,
} from "@/features/users/schemas/user.schema";
import {
  createUserAction,
  updateUserAction,
} from "@/features/users/actions/user.actions";
import { ROUTES } from "@/constants/route";
import { UserDto } from "@/features/users/types/user.types";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

type UserFormProps =
  | { mode: "create" }
  | { mode: "edit"; defaultValues: UserDto };

export default function UserForm(props: UserFormProps) {
  const router = useRouter();
  const isEdit = props.mode === "edit";

  const form = useForm<CreateUserFormValues | UpdateUserFormValues>({
    resolver: zodResolver(isEdit ? updateUserSchema : createUserSchema),
    defaultValues: isEdit
      ? {
          username: props.defaultValues.username,
          email: props.defaultValues.email,
          phone: props.defaultValues.phone,
          address: props.defaultValues.address,
          role: props.defaultValues.role,
        }
      : {
          username: "",
          email: "",
          phone: "",
          address: "",
          password: "",
          role: "CLIENT",
        },
  });

  const onSubmit = async (
    values: CreateUserFormValues | UpdateUserFormValues,
  ) => {
    try {
      const result = isEdit
        ? await updateUserAction(
            (props as { mode: "edit"; defaultValues: UserDto }).defaultValues
              .id,
            values as UpdateUserFormValues,
          )
        : await createUserAction(values as CreateUserFormValues);

      if (result.success) {
        toast.success(
          isEdit
            ? "Utilisateur mis à jour avec succès!"
            : "Utilisateur créé avec succès!",
        );
        router.push(ROUTES.DASHBOARD_USERS);
        form.reset();
      } else {
        toast.error(result.error || "Une erreur est survenue");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur inconnue");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {isEdit ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}
            </h2>
            <p className="text-gray-600">
              {isEdit
                ? "Mettez à jour les informations de l'utilisateur"
                : "Créez un nouveau compte utilisateur pour votre boutique"}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-pink-100 overflow-hidden">
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-6">
              <h3 className="text-white text-xl font-semibold">
                Informations utilisateur
              </h3>
              <p className="text-pink-100 text-sm">
                {isEdit
                  ? "Modifiez les champs nécessaires"
                  : "Remplissez tous les champs requis"}
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="p-8 space-y-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">
                          Nom d&apos;utilisateur
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ex: john_doe"
                            {...field}
                            className="py-3 bg-gray-50 border-gray-200 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                          />
                        </FormControl>
                        <FormDescription className="text-gray-500">
                          Choisissez un nom d&apos;utilisateur unique.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">
                          Adresse email
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="exemple@email.com"
                            {...field}
                            className="py-3 bg-gray-50 border-gray-200 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                          />
                        </FormControl>
                        <FormDescription className="text-gray-500">
                          Une adresse email valide est requise.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">
                          Numéro de téléphone
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="+212600000000"
                            {...field}
                            className="py-3 bg-gray-50 border-gray-200 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                          />
                        </FormControl>
                        <FormDescription className="text-gray-500">
                          Format international recommandé.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">
                          Adresse complète
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Rue, ville, pays"
                            {...field}
                            className="py-3 bg-gray-50 border-gray-200 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                          />
                        </FormControl>
                        <FormDescription className="text-gray-500">
                          Adresse de livraison et facturation.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Password — uniquement en mode create */}
                {!isEdit && (
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">
                            Mot de passe
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="********"
                              {...field}
                              className="py-3 bg-gray-50 border-gray-200 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                            />
                          </FormControl>
                          <FormDescription className="text-gray-500">
                            Minimum 8 caractères avec lettres et chiffres.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Rôle utilisateur
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="py-3 bg-gray-50 border-gray-200">
                            <SelectValue placeholder="Sélectionnez un rôle" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white border-gray-200">
                          <SelectItem value="CLIENT">Client</SelectItem>
                          <SelectItem value="MANAGER">Manager</SelectItem>
                          <SelectItem value="ADMIN">Administrateur</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription className="text-gray-500">
                        Détermine les permissions de l&apos;utilisateur.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
                  <Button
                    type="reset"
                    variant="outline"
                    onClick={() => form.reset()}
                    className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    Réinitialiser
                  </Button>
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="px-8 py-2 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-medium cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {form.formState.isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {isEdit ? "Mise à jour..." : "Création..."}
                      </>
                    ) : isEdit ? (
                      "Mettre à jour"
                    ) : (
                      "Créer l'utilisateur"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
