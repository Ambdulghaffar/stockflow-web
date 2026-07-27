import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/constants/route";
import { formatDate } from "@/utils/format-date";
import { OrderRespDto } from "../types/order.types";
import {
  ORDER_STATUS_BADGE_CLASSES,
  ORDER_STATUS_LABELS,
} from "../constants/order-status";

interface OrderListItemProps {
  order: OrderRespDto;
}

export default function OrderListItem({ order }: OrderListItemProps) {
  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link
      href={ROUTES.DASHBOARD_ACCOUNT_ORDER_DETAIL(order.id)}
      className="flex flex-col gap-3 rounded-2xl border bg-gray-50 p-5 transition-colors hover:bg-gray-100 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <p className="font-semibold text-gray-900">Commande #{order.id}</p>
        <p className="mt-1 text-sm text-gray-500">
          {formatDate(order.createdAt)} · {itemCount} article
          {itemCount > 1 ? "s" : ""}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Badge className={ORDER_STATUS_BADGE_CLASSES[order.status]}>
          {ORDER_STATUS_LABELS[order.status]}
        </Badge>
        <span className="text-lg font-bold text-gray-900">
          {order.totalAmount.toFixed(2)} €
        </span>
      </div>
    </Link>
  );
}
