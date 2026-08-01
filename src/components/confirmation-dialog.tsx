"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Trash } from "lucide-react";

type ConfirmationDialogProps = {
  onConfirm: () => void;
  disabled?: boolean;
};

export default function ConfirmationDialog({
  onConfirm,
  disabled = false,
}: ConfirmationDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="cursor-pointer" aria-label="Supprimer">
        <Trash color="red" size={16} />
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous absolument sûr&nbsp;?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible. L&apos;élément sera définitivement
            supprimé.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Annuler</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={onConfirm}
            disabled={disabled}
          >
            Continuer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
