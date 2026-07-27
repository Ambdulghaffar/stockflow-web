import { StockMovementType } from "../types/stock-movement.types";

export const STOCK_MOVEMENT_TYPE_LABELS: Record<StockMovementType, string> = {
  SALE: "Vente",
  CANCELLATION: "Annulation",
  RESTOCK: "Réassort",
  DAMAGE: "Casse / Perte",
};

// Palette : SALE=bleu (sortie normale liée à une commande), CANCELLATION=gris
// (mouvement neutre/annulé, sans impact durable), RESTOCK=vert (entrée positive),
// DAMAGE=rouge (perte/sortie négative anormale).
export const STOCK_MOVEMENT_TYPE_BADGE_CLASSES: Record<
  StockMovementType,
  string
> = {
  SALE: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  CANCELLATION:
    "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  RESTOCK:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  DAMAGE: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
};

// RESTOCK et CANCELLATION augmentent (ou restaurent) le stock → affichés en vert avec "+".
// SALE et DAMAGE diminuent le stock → affichés en rouge avec "-".
export const isPositiveMovement = (type: StockMovementType): boolean =>
  type === "RESTOCK" || type === "CANCELLATION";
