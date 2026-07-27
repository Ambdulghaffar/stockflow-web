export const getStockBadgeClasses = (stock: number): string => {
  if (stock === 0) {
    return "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300";
  }
  if (stock <= 10) {
    return "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300";
  }
  return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300";
};
