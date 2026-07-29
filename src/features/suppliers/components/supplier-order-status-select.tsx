"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "react-toastify";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateSupplierOrderStatusAction } from "../actions/supplier-order.actions";
import {
  SUPPLIER_ORDER_STATUS_BADGE_CLASSES,
  SUPPLIER_ORDER_STATUS_LABELS,
  SUPPLIER_ORDER_STATUS_TRANSITIONS,
} from "../utils/supplier-order-status";
import { SupplierOrderStatus } from "../types/supplier-order.types";

interface SupplierOrderStatusSelectProps {
  orderId: number;
  currentStatus: SupplierOrderStatus;
}

export default function SupplierOrderStatusSelect({
  orderId,
  currentStatus,
}: SupplierOrderStatusSelectProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const availableTransitions = SUPPLIER_ORDER_STATUS_TRANSITIONS[currentStatus];

  if (availableTransitions.length === 0) {
    return (
      <div className="flex items-center gap-2">
        <Badge className={SUPPLIER_ORDER_STATUS_BADGE_CLASSES[currentStatus]}>
          {SUPPLIER_ORDER_STATUS_LABELS[currentStatus]}
        </Badge>
        <span className="text-sm text-muted-foreground">Statut final</span>
      </div>
    );
  }

  const handleChange = (value: string) => {
    if (value === currentStatus) return;

    startTransition(async () => {
      const result = await updateSupplierOrderStatusAction(
        orderId,
        value as SupplierOrderStatus,
      );

      if (result.success) {
        toast.success(
          value === "RECEIVED"
            ? "Commande reçue — stock mis à jour !"
            : "Statut mis à jour !",
        );
        router.refresh();
      } else {
        toast.error(result.error || "Une erreur est survenue");
      }
    });
  };

  return (
    <Select value={currentStatus} onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger className="w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={currentStatus} disabled>
          {SUPPLIER_ORDER_STATUS_LABELS[currentStatus]}
        </SelectItem>
        {availableTransitions.map((status) => (
          <SelectItem key={status} value={status}>
            {SUPPLIER_ORDER_STATUS_LABELS[status]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}