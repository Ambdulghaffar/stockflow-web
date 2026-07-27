"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  stockAdjustmentSchema,
  StockAdjustmentFormValues,
} from "@/features/stock/schemas/stock-adjustment-schema";
import { adjustStockAction } from "@/features/stock/actions/stock-movement.actions";
import { ProductResDto } from "@/features/products/types/product.types";

type StockAdjustmentDialogProps = {
  trigger: React.ReactNode;
} & (
  | {
      productId: number;
      productName: string;
      currentStock: number;
      products?: undefined;
    }
  | {
      productId?: undefined;
      productName?: undefined;
      currentStock?: undefined;
      products: Pick<ProductResDto, "id" | "name" | "stock">[];
    }
);

type StockAdjustmentFormInput = z.input<typeof stockAdjustmentSchema>;

const TYPE_OPTIONS: { value: "RESTOCK" | "DAMAGE"; label: string }[] = [
  { value: "RESTOCK", label: "Réassort (+)" },
  { value: "DAMAGE", label: "Casse / Perte (-)" },
];

export default function StockAdjustmentDialog(
  props: StockAdjustmentDialogProps,
) {
  const { trigger, products } = props;
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<
    StockAdjustmentFormInput,
    unknown,
    StockAdjustmentFormValues
  >({
    resolver: zodResolver(stockAdjustmentSchema),
    defaultValues: {
      productId: props.productId ?? 0,
      type: "RESTOCK",
      quantity: 1,
      reason: "",
    },
  });

  const selectedProductId = form.watch("productId");
  const selectedProduct = products?.find(
    (product) => product.id === Number(selectedProductId),
  );

  const productName = props.productId ? props.productName : selectedProduct?.name;
  const currentStock = props.productId
    ? props.currentStock
    : selectedProduct?.stock;

  const onSubmit = async (values: StockAdjustmentFormValues) => {
    const result = await adjustStockAction(values);

    if (result.success) {
      toast.success("Stock ajusté avec succès !");
      setOpen(false);
      form.reset();
      router.refresh();
    } else {
      toast.error(result.error || "Une erreur est survenue");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) form.reset();
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Ajuster le stock{productName ? ` — ${productName}` : ""}
          </DialogTitle>
          <DialogDescription>
            {currentStock !== undefined
              ? `Stock actuel : ${currentStock}`
              : "Sélectionnez un produit pour voir son stock actuel."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {products && (
              <FormField
                control={form.control}
                name="productId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Produit</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value ? String(field.value) : undefined}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Sélectionnez un produit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {products.map((product) => (
                          <SelectItem
                            key={product.id}
                            value={String(product.id)}
                          >
                            {product.name} (stock : {product.stock})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type d&apos;ajustement</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sélectionnez un type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TYPE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
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
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantité</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      step="1"
                      {...field}
                      value={field.value as number | string}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Motif</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="ex: Réassort fournisseur, casse en entrepôt..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="gap-2 bg-pink-600 hover:bg-pink-700"
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                Confirmer
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
