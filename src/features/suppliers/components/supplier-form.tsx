"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
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
import { Textarea } from "@/components/ui/textarea";
import { ROUTES } from "@/constants/route";
import {
  createSupplierAction,
  updateSupplierAction,
} from "../actions/supplier.actions";
import { supplierSchema, SupplierFormValues } from "../schemas/supplier-schema";
import { SupplierDto } from "../types/supplier.types";

type SupplierFormProps =
  | { mode: "create" }
  | { mode: "edit"; defaultValues: SupplierDto };

export default function SupplierForm(props: SupplierFormProps) {
  const router = useRouter();
  const isEdit = props.mode === "edit";

  const form = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierSchema),
    defaultValues: isEdit
      ? {
          name: props.defaultValues.name,
          contactName: props.defaultValues.contactName ?? "",
          email: props.defaultValues.email ?? "",
          phone: props.defaultValues.phone ?? "",
          address: props.defaultValues.address ?? "",
        }
      : {
          name: "",
          contactName: "",
          email: "",
          phone: "",
          address: "",
        },
  });

  const onSubmit = async (values: SupplierFormValues) => {
    try {
      const payload = {
        name: values.name,
        contactName: values.contactName || undefined,
        email: values.email || undefined,
        phone: values.phone || undefined,
        address: values.address || undefined,
      };

      const result = isEdit
        ? await updateSupplierAction(
            (props as { mode: "edit"; defaultValues: SupplierDto }).defaultValues.id,
            payload,
          )
        : await createSupplierAction(payload);

      if (result.success) {
        toast.success(
          isEdit
            ? "Fournisseur mis à jour avec succès !"
            : "Fournisseur créé avec succès !",
        );
        router.push(ROUTES.DASHBOARD_SUPPLIERS);
        if (!isEdit) form.reset();
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
              {isEdit ? "Modifier le fournisseur" : "Ajouter un fournisseur"}
            </h2>
            <p className="text-gray-600">
              {isEdit
                ? "Mettez à jour les informations du fournisseur"
                : "Créez un nouveau fournisseur pour vos achats"}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-pink-100 overflow-hidden">
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-6">
              <h3 className="text-white text-xl font-semibold">
                Informations du fournisseur
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
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Nom du fournisseur
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ex: Aurix Distribution"
                          {...field}
                          className="py-3 bg-gray-50 border-gray-200 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                        />
                      </FormControl>
                      <FormDescription className="text-gray-500">
                        Choisissez un nom clair pour identifier ce fournisseur.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">
                          Nom du contact
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ex: Nadia Benali"
                            {...field}
                            className="py-3 bg-gray-50 border-gray-200 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                          />
                        </FormControl>
                        <FormDescription className="text-gray-500">
                          Nom de la personne à contacter (optionnel).
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
                          E-mail
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="contact@fournisseur.com"
                            {...field}
                            className="py-3 bg-gray-50 border-gray-200 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                          />
                        </FormControl>
                        <FormDescription className="text-gray-500">
                          Adresse e-mail de contact (optionnel).
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">
                          Téléphone
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ex: +33 6 12 34 56 78"
                            {...field}
                            className="py-3 bg-gray-50 border-gray-200 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                          />
                        </FormControl>
                        <FormDescription className="text-gray-500">
                          Numéro de téléphone du fournisseur (optionnel).
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
                          Adresse
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Adresse postale complète..."
                            {...field}
                            className="bg-gray-50 border-gray-200 focus-visible:ring-pink-500 focus-visible:border-pink-500 transition-colors"
                          />
                        </FormControl>
                        <FormDescription className="text-gray-500">
                          Adresse physique du fournisseur (optionnel).
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
                  <Button
                    type="reset"
                    variant="outline"
                    onClick={() => form.reset()}
                    disabled={form.formState.isSubmitting}
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
                      "Créer le fournisseur"
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