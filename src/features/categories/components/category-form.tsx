"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
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
import {
  categorySchema,
  CategoryFormValues,
} from "@/features/categories/schemas/category-schema";
import {
  createCategoryAction,
  updateCategoryAction,
} from "@/features/categories/actions/category.actions";
import { ROUTES } from "@/constants/route";
import { CategoryDto } from "@/features/categories/types/category.types";
import { toast } from "react-toastify";

type CategoryFormProps =
  | { mode: "create" }
  | { mode: "edit"; defaultValues: CategoryDto };

export default function CategoryForm(props: CategoryFormProps) {
  const router = useRouter();
  const isEdit = props.mode === "edit";

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: isEdit
      ? {
          name: props.defaultValues.name,
          description: props.defaultValues.description ?? "",
          imageUrl: props.defaultValues.imageUrl ?? "",
        }
      : {
          name: "",
          description: "",
          imageUrl: "",
        },
  });

  const onSubmit = async (values: CategoryFormValues) => {
    try {
      const result = isEdit
        ? await updateCategoryAction(
            (props as { mode: "edit"; defaultValues: CategoryDto })
              .defaultValues.id,
            values,
          )
        : await createCategoryAction(values);

      if (result.success) {
        toast.success(
          isEdit
            ? "Catégorie mise à jour avec succès!"
            : "Catégorie créée avec succès!",
        );
        router.push(ROUTES.DASHBOARD_CATEGORIES);
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
              {isEdit ? "Modifier la catégorie" : "Ajouter une catégorie"}
            </h2>
            <p className="text-gray-600">
              {isEdit
                ? "Mettez à jour les informations de la catégorie"
                : "Créez une nouvelle catégorie pour organiser votre catalogue"}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-pink-100 overflow-hidden">
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-6">
              <h3 className="text-white text-xl font-semibold">
                Informations de la catégorie
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
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">
                          Nom de la catégorie
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ex: Montres connectées"
                            {...field}
                            className="py-3 bg-gray-50 border-gray-200 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                          />
                        </FormControl>
                        <FormDescription className="text-gray-500">
                          Choisissez un nom de catégorie unique et clair.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">
                          URL de l&apos;image
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://..."
                            {...field}
                            className="py-3 bg-gray-50 border-gray-200 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                          />
                        </FormControl>
                        <FormDescription className="text-gray-500">
                          Lien vers l&apos;image représentant la catégorie (optionnel).
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Décrivez brièvement cette catégorie..."
                          {...field}
                          className="bg-gray-50 border-gray-200 focus-visible:ring-pink-500 focus-visible:border-pink-500 transition-colors"
                        />
                      </FormControl>
                      <FormDescription className="text-gray-500">
                        Une brève description de la catégorie (optionnel).
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
                      "Créer la catégorie"
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
