import {
  LayoutDashboard, Users, Box, ShoppingCart,
  Settings, FileText, Truck, Tags, UserCircle,
  MapPin, Heart, BarChart3, Receipt,
} from "lucide-react";
import { ROUTES } from "./route";

export type Role = "ADMIN" | "MANAGER" | "CLIENT";

export const NAV_ITEMS = [
  {
    title: "Tableau de bord",
    icon: LayoutDashboard,
    url: ROUTES.DASHBOARD,
    roles: ["ADMIN", "MANAGER", "CLIENT"] as Role[],
  },
  {
    title: "Catalogue",
    icon: Box,
    url: "#",
    roles: ["ADMIN", "MANAGER"] as Role[],
    items: [
      { title: "Produits", url: ROUTES.DASHBOARD_PRODUCTS },
      { title: "Catégories", url: ROUTES.DASHBOARD_CATEGORIES },
    ],
  },
  {
    title: "Ventes",
    icon: ShoppingCart,
    url: "#",
    roles: ["ADMIN", "MANAGER"] as Role[],
    items: [
      { title: "Commandes", url: ROUTES.DASHBOARD_SALES_ORDERS },
      { title: "Factures", url: ROUTES.DASHBOARD_SALES_INVOICES },
      { title: "Remboursements", url: ROUTES.DASHBOARD_SALES_REFUNDS },
    ],
  },
  {
    title: "Stocks",
    icon: FileText,
    url: "#",
    roles: ["ADMIN", "MANAGER"] as Role[],
    items: [
      { title: "État des stocks", url: ROUTES.DASHBOARD_STOCK_LEVELS },
      { title: "Mouvements", url: ROUTES.DASHBOARD_STOCK_MOVEMENTS },
    ],
  },
  {
    title: "Fournisseurs",
    icon: Truck,
    url: "#",
    roles: ["ADMIN", "MANAGER"] as Role[],
    items: [
      { title: "Liste des fournisseurs", url: ROUTES.DASHBOARD_SUPPLIERS },
      { title: "Commandes fournisseurs", url: ROUTES.DASHBOARD_SUPPLIERS_ORDERS },
    ],
  },
  {
    title: "Rapports",
    icon: BarChart3,
    url: "#",
    roles: ["ADMIN", "MANAGER"] as Role[],
    items: [
      { title: "Ventes", url: ROUTES.DASHBOARD_REPORTS_SALES },
      { title: "Stocks", url: ROUTES.DASHBOARD_REPORTS_STOCK },
    ],
  },
  {
    title: "Utilisateurs",
    icon: Users,
    url: "#",
    roles: ["ADMIN"] as Role[],
    items: [
      { title: "Liste des utilisateurs", url: ROUTES.DASHBOARD_USERS },
      { title: "Ajouter un utilisateur", url: ROUTES.DASHBOARD_CREATE_USERS },
      { title: "Rôles & permissions", url: ROUTES.DASHBOARD_USERS_ROLES },
    ],
  },
  {
    title: "Marketing",
    icon: Tags,
    url: "#",
    roles: ["ADMIN", "MANAGER"] as Role[],
    items: [
      { title: "Promotions", url: ROUTES.DASHBOARD_MARKETING_PROMOTIONS },
      { title: "Codes de réduction", url: ROUTES.DASHBOARD_MARKETING_DISCOUNTS },
    ],
  },
  {
    title: "Paramètres",
    icon: Settings,
    url: "#",
    roles: ["ADMIN"] as Role[],
    items: [
      { title: "Informations de l'entreprise", url: ROUTES.DASHBOARD_SETTINGS_COMPANY },
      { title: "Intégrations", url: ROUTES.DASHBOARD_SETTINGS_INTEGRATIONS },
      { title: "Sécurité & accès", url: ROUTES.DASHBOARD_SETTINGS_SECURITY },
    ],
  },
  {
    title: "Mes commandes",
    icon: Receipt,
    url: ROUTES.DASHBOARD_ACCOUNT_ORDERS,
    roles: ["CLIENT"] as Role[],
  },
  {
    title: "Mes adresses",
    icon: MapPin,
    url: ROUTES.DASHBOARD_ACCOUNT_ADDRESSES,
    roles: ["CLIENT"] as Role[],
  },
  {
    title: "Liste de souhaits",
    icon: Heart,
    url: ROUTES.DASHBOARD_ACCOUNT_WISHLIST,
    roles: ["CLIENT"] as Role[],
  },
  {
    title: "Mon profil",
    icon: UserCircle,
    url: ROUTES.DASHBOARD_ACCOUNT_PROFILE,
    roles: ["CLIENT"] as Role[],
  },
];
