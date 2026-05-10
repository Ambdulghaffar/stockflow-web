import {
  LayoutDashboard,
  Users,
  Box,
  ShoppingCart,
  Settings,
  FileText,
  Truck,
  Tags,
} from "lucide-react";
import { ROUTES } from "./route";

export const NavMainAdmin = [
  {
    title: "Tableau de bord",
    icon: LayoutDashboard,
    url: ROUTES.DASHBOARD,
  },
  {
    title: "Catalogue",
    icon: Box,
    url: "#",
    items: [
      {
        title: "Produits",
        url: ROUTES.DASHBOARD_PRODUCTS,
      },
      {
        title: "Catégories",
        url: ROUTES.DASHBOARD_CATEGORIES,
      },
    ],
  },
  {
    title: "Ventes",
    icon: ShoppingCart,
    url: "#",
    items: [
      {
        title: "Commandes",
        url: "#",
      },
      {
        title: "Factures",
        url: "#",
      },
      {
        title: "Remboursements",
        url: "#",
      },
    ],
  },
  {
    title: "Stocks",
    icon: FileText,
    url: "#",
    items: [
      {
        title: "État des stocks",
        url: "#",
      },
      {
        title: "Mouvements",
        url: "#",
      },
    ],
  },
  {
    title: "Fournisseurs",
    icon: Truck,
    url: "#",
    items: [
      {
        title: "Liste des fournisseurs",
        url: "#",
      },
      {
        title: "Commandes fournisseurs",
        url: "#",
      },
    ],
  },
  {
    title: "Utilisateurs",
    icon: Users,
    url: "#",
    items: [
      {
        title: "Liste des utilisateurs",
        url: ROUTES.DASHBOARD_USERS,
      },
      {
        title: "Ajouter un utilisateur",
        url: ROUTES.DASHBOARD_CREATE_USERS,
      },
      {
        title: "Rôles & permissions",
        url: "#",
      },
    ],
  },
  {
    title: "Marketing",
    icon: Tags,
    url: "#",
    items: [
      {
        title: "Promotions",
        url: "#",
      },
      {
        title: "Codes de réduction",
        url: "#",
      },
    ],
  },
  {
    title: "Paramètres",
    icon: Settings,
    url: "#",
    items: [
      {
        title: "Informations de l'entreprise",
        url: "#",
      },
      {
        title: "Intégrations",
        url: "#",
      },
      {
        title: "Sécurité & accès",
        url: "#",
      },
    ],
  },
];
