"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateOrderStatusAction } from "@/features/orders/actions/order.actions";
import {
  ORDER_STATUS_BADGE_CLASSES,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_TRANSITIONS,
} from "@/features/orders/constants/order-status";
import { OrderStatus } from "@/features/orders/types/order.types";

interface OrderStatusSelectProps {
  orderId: number;
  currentStatus: OrderStatus;
}

export default function OrderStatusSelect({
  orderId,
  currentStatus,
}: OrderStatusSelectProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const availableTransitions = ORDER_STATUS_TRANSITIONS[currentStatus];

  if (availableTransitions.length === 0) {
    return (
      <div className="flex items-center gap-2">
        <Badge className={ORDER_STATUS_BADGE_CLASSES[currentStatus]}>
          {ORDER_STATUS_LABELS[currentStatus]}
        </Badge>
        <span className="text-sm text-muted-foreground">Statut final</span>
      </div>
    );
  }

  const handleChange = (value: string) => {
    if (value === currentStatus) return;

    startTransition(async () => {
      const result = await updateOrderStatusAction(
        orderId,
        value as OrderStatus,
      );
      if (result.success) {
        toast.success("Statut mis à jour !");
        router.refresh();
      } else {
        toast.error(result.error || "Une erreur est survenue");
      }
    });
  };

  return (
    <Select
      value={currentStatus}
      onValueChange={handleChange}
      disabled={isPending}
    >
      <SelectTrigger className="w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={currentStatus} disabled>
          {ORDER_STATUS_LABELS[currentStatus]}
        </SelectItem>
        {availableTransitions.map((status) => (
          <SelectItem key={status} value={status}>
            {ORDER_STATUS_LABELS[status]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
