import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProfileRoleSummaryProps {
  role: "ADMIN" | "MANAGER";
}

const ROLE_BADGE_CLASSES: Record<"ADMIN" | "MANAGER", string> = {
  ADMIN: "bg-pink-50 text-pink-700 dark:bg-pink-950 dark:text-pink-300",
  MANAGER: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
};

const ROLE_DESCRIPTIONS: Record<"ADMIN" | "MANAGER", string> = {
  ADMIN:
    "En tant qu'Administrateur, vous avez accès à l'ensemble des fonctionnalités : gestion du catalogue, des ventes, des utilisateurs et des paramètres de la boutique.",
  MANAGER:
    "Vous pouvez gérer le catalogue (produits, catégories) et consulter les ventes. La gestion des utilisateurs et des paramètres est réservée aux administrateurs.",
};

export default function ProfileRoleSummary({ role }: ProfileRoleSummaryProps) {
  return (
    <Card className="border-gray-100 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-gray-800">
          Rôle et permissions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Badge className={ROLE_BADGE_CLASSES[role]}>{role}</Badge>
        <p className="text-sm text-gray-600">{ROLE_DESCRIPTIONS[role]}</p>
      </CardContent>
    </Card>
  );
}
