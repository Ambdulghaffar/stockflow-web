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
import ImageUploadField from "@/components/dashboard/image-upload-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import {
  productSchema,
  ProductFormValues,
} from "@/features/products/schemas/product-schema";
import {
  createProductAction,
  updateProductAction,
} from "@/features/products/actions/product.actions";
import { ROUTES } from "@/constants/route";
import { ProductResDto } from "@/features/products/types/product.types";
import { CategoryResDto } from "@/features/categories/types/category.types";
import { toast } from "react-toastify";

// Type manipulé par le formulaire AVANT la coercion Zod (ce que useForm doit recevoir)
type ProductFormInput = z.input<typeof productSchema>;

type ProductFormProps =
  | { mode: "create"; categories: CategoryResDto[] }
  | {
      mode: "edit";
      defaultValues: ProductResDto;
      categories: CategoryResDto[];
    };

const STATUS_OPTIONS: { value: ProductFormValues["status"]; label: string }[] =
  [
    { value: "ACTIVE", label: "Actif" },
    { value: "INACTIVE", label: "Inactif" },
    { value: "OUT_OF_STOCK", label: "Rupture de stock" },
  ];

export default function ProductForm(props: ProductFormProps) {
  const router = useRouter();
  const isEdit = props.mode === "edit";
  const categories = props.categories;

  const form = useForm<ProductFormInput, unknown, ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: isEdit
      ? {
          name: props.defaultValues.name,
          description: props.defaultValues.description ?? "",
          price: props.defaultValues.price,
          stock: props.defaultValues.stock,
          imageUrl: props.defaultValues.imageUrl ?? "",
          categoryId: props.defaultValues.categoryId,
          status: props.defaultValues.status,
        }
      : {
          name: "",
          description: "",
          price: 0,
          stock: 0,
          imageUrl: "",
          categoryId: categories[0]?.id ?? 0,
          status: "ACTIVE",
        },
  });

  const onSubmit = async (values: ProductFormValues) => {
    try {
      const result = isEdit
        ? await updateProductAction(
            (props as { mode: "edit"; defaultValues: ProductResDto })
              .defaultValues.id,
            values,
          )
        : await createProductAction(values);

      if (result.success) {
        toast.success(
          isEdit
            ? "Produit mis à jour avec succès!"
            : "Produit créé avec succès!",
        );
        router.push(ROUTES.DASHBOARD_PRODUCTS);
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
              {isEdit ? "Modifier le produit" : "Ajouter un produit"}
            </h2>
            <p className="text-gray-600">
              {isEdit
                ? "Mettez à jour les informations du produit"
                : "Ajoutez un nouveau produit à votre catalogue"}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-pink-100 overflow-hidden">
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-6">
              <h3 className="text-white text-xl font-semibold">
                Informations du produit
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
                          Nom du produit
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ex: Montre Aurora S9"
                            {...field}
                            className="py-3 bg-gray-50 border-gray-200 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                          />
                        </FormControl>
                        <FormDescription className="text-gray-500">
                          Choisissez un nom de produit clair et descriptif.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">
                          Catégorie
                        </FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                          value={field.value ? String(field.value) : undefined}
                        >
                          <FormControl>
                            <SelectTrigger className="py-3 bg-gray-50 border-gray-200 w-full">
                              <SelectValue placeholder="Sélectionnez une catégorie" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white border-gray-200">
                            {categories.map((category) => (
                              <SelectItem
                                key={category.id}
                                value={String(category.id)}
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription className="text-gray-500">
                          La catégorie à laquelle appartient ce produit.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">
                          Prix
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            {...field}
                            value={field.value as number | string}
                            className="py-3 bg-gray-50 border-gray-200 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                          />
                        </FormControl>
                        <FormDescription className="text-gray-500">
                          Prix unitaire, doit être supérieur à 0.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">
                          Stock
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="1"
                            min="0"
                            placeholder="0"
                            {...field}
                            value={field.value as number | string}
                            className="py-3 bg-gray-50 border-gray-200 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                          />
                        </FormControl>
                        <FormDescription className="text-gray-500">
                          Quantité disponible en stock.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Image du produit
                      </FormLabel>
                      <FormControl>
                        <ImageUploadField
                          currentImageUrl={field.value}
                          onUploadSuccess={(url) => field.onChange(url)}
                          folder="products"
                        />
                      </FormControl>
                      <FormDescription className="text-gray-500">
                        Une image représentant le produit (optionnel).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Statut
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="py-3 bg-gray-50 border-gray-200 w-full">
                            <SelectValue placeholder="Sélectionnez un statut" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white border-gray-200">
                          {STATUS_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription className="text-gray-500">
                        Détermine la visibilité du produit dans le catalogue.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                          placeholder="Décrivez brièvement ce produit..."
                          {...field}
                          className="bg-gray-50 border-gray-200 focus-visible:ring-pink-500 focus-visible:border-pink-500 transition-colors"
                        />
                      </FormControl>
                      <FormDescription className="text-gray-500">
                        Une brève description du produit (optionnel).
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
                      "Créer le produit"
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
