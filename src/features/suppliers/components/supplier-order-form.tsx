"use client";

import { useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Loader2, PlusCircle, Trash2 } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/constants/route";
import { ProductResDto } from "@/features/products/types/product.types";
import { createSupplierOrderAction } from "../actions/supplier-order.actions";
import {
  supplierOrderSchema,
  SupplierOrderFormValues,
} from "../schemas/supplier-order-schema";
import { SupplierDto } from "../types/supplier.types";

type SupplierOrderFormInput = import("zod").z.input<typeof supplierOrderSchema>;

interface SupplierOrderFormProps {
  suppliers: SupplierDto[];
  products: ProductResDto[];
}

export default function SupplierOrderForm({ suppliers, products }: SupplierOrderFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<SupplierOrderFormInput, unknown, SupplierOrderFormValues>({
    resolver: zodResolver(supplierOrderSchema),
    defaultValues: {
      supplierId: suppliers[0]?.id ?? 0,
      items: [
        {
          productId: products[0]?.id ?? 0,
          quantity: 1,
          unitCost: products[0]?.price ?? 0,
        },
      ],
    },
  });

  // useFieldArray gère les lignes de commande dynamiques: ajout, suppression,
  // et synchronisation automatique avec react-hook-form sans state local manuel.
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const watchedItems = form.watch("items") ?? [];
  const totalAmount = watchedItems.reduce((sum, item) => {
    const quantity = Number(item?.quantity ?? 0);
    const unitCost = Number(item?.unitCost ?? 0);
    return sum + quantity * unitCost;
  }, 0);

  const onSubmit = (values: SupplierOrderFormValues) => {
    startTransition(async () => {
      try {
        const result = await createSupplierOrderAction({
          supplierId: values.supplierId,
          items: values.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitCost: item.unitCost,
          })),
        });

        if (result.success) {
          toast.success("Commande fournisseur créée avec succès !");
          router.push(ROUTES.DASHBOARD_SUPPLIERS_ORDER_DETAIL(result.order.id));
        } else {
          toast.error(result.error || "Une erreur est survenue");
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Erreur inconnue");
      }
    });
  };

  const addLine = () => {
    append({
      productId: products[0]?.id ?? 0,
      quantity: 1,
      unitCost: products[0]?.price ?? 0,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Créer une commande fournisseur
            </h2>
            <p className="text-gray-600">
              Sélectionnez un fournisseur et composez vos lignes de commande.
            </p>
          </div>

          <Card className="border-pink-100 shadow-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-pink-500 to-pink-600 text-white">
              <CardTitle>Nouvelle commande fournisseur</CardTitle>
              <CardDescription className="text-pink-100">
                Ajoutez autant de lignes produit que nécessaire.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="supplierId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">
                          Fournisseur
                        </FormLabel>
                        <Select
                          onValueChange={(value) => field.onChange(Number(value))}
                          value={field.value ? String(field.value) : undefined}
                        >
                          <FormControl>
                            <SelectTrigger className="py-3 bg-gray-50 border-gray-200 w-full">
                              <SelectValue placeholder="Sélectionnez un fournisseur" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white border-gray-200">
                            {suppliers.map((supplier) => (
                              <SelectItem key={supplier.id} value={String(supplier.id)}>
                                {supplier.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription className="text-gray-500">
                          Le fournisseur pour lequel vous passez cette commande.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Lignes de commande
                        </h3>
                        <p className="text-sm text-gray-500">
                          Chaque ligne contient un produit, une quantité et un coût unitaire.
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        className="gap-2 border-pink-200 text-pink-700 hover:bg-pink-50"
                        onClick={addLine}
                      >
                        <PlusCircle className="h-4 w-4" />
                        Ajouter une ligne
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {fields.map((field, index) => (
                        <div
                          key={field.id}
                          className="grid gap-4 rounded-2xl border border-pink-100 bg-gray-50 p-4 lg:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))_auto] lg:items-start"
                        >
                          <FormField
                            control={form.control}
                            name={`items.${index}.productId` as const}
                            render={({ field: productField }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 font-medium">
                                  Produit
                                </FormLabel>
                                <Select
                                  onValueChange={(value) =>
                                    productField.onChange(Number(value))
                                  }
                                  value={productField.value ? String(productField.value) : undefined}
                                >
                                  <FormControl>
                                    <SelectTrigger className="py-3 bg-white border-gray-200 w-full">
                                      <SelectValue placeholder="Sélectionnez un produit" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="bg-white border-gray-200">
                                    {products.map((product) => (
                                      <SelectItem
                                        key={product.id}
                                        value={String(product.id)}
                                      >
                                        {product.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`items.${index}.quantity` as const}
                            render={({ field: quantityField }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 font-medium">
                                  Quantité
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    min="1"
                                    step="1"
                                    {...quantityField}
                                    value={quantityField.value as number | string}
                                    className="py-3 bg-white border-gray-200 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`items.${index}.unitCost` as const}
                            render={({ field: costField }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 font-medium">
                                  Coût unitaire
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    {...costField}
                                    value={costField.value as number | string}
                                    className="py-3 bg-white border-gray-200 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="flex items-end">
                            <Button
                              type="button"
                              variant="outline"
                              className="w-full gap-2 border-red-200 text-red-700 hover:bg-red-50 lg:w-auto"
                              onClick={() => remove(index)}
                              disabled={fields.length === 1}
                            >
                              <Trash2 className="h-4 w-4" />
                              Supprimer
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 rounded-2xl border border-pink-100 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total estimé</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {totalAmount.toFixed(2)} €
                      </p>
                    </div>

                    <div className="flex justify-end gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => form.reset()}
                        disabled={isPending}
                        className="border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        Réinitialiser
                      </Button>
                      <Button
                        type="submit"
                        disabled={isPending}
                        className="min-w-44 bg-pink-600 hover:bg-pink-700 text-white"
                      >
                        {isPending ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Création...
                          </>
                        ) : (
                          "Créer la commande"
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}