"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { useState } from "react";
import { Loader2, MailCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/constants/route";
import Link from "next/link";
import { forgotPassword } from "../services/auth.services";

const FormSchema = z.object({
  email: z.email({
    message: "Veuillez entrer une adresse email valide.",
  }),
});

export function ForgotPasswordForm() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await forgotPassword(data.email);
      setSubmitted(true);
    } catch {
      toast.error("Une erreur est survenue, réessayez plus tard.");
    }
  }

  if (submitted) {
    return (
      <div className="text-center space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pink-100">
          <MailCheck className="h-8 w-8 text-pink-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Vérifiez votre boîte mail
          </h2>
          <p className="mt-2 text-gray-500">
            Si un compte existe avec cette adresse, un lien de
            réinitialisation vient de vous être envoyé. Pensez à vérifier vos
            spams.
          </p>
        </div>
        <Button
          asChild
          className="w-full py-6 text-lg bg-pink-500 hover:bg-pink-600 text-white"
        >
          <Link href={ROUTES.LOGIN}>Retour à la connexion</Link>
        </Button>
        <p className="text-sm text-gray-500">
          Vous n&apos;avez rien reçu ?{" "}
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="font-medium text-pink-600 hover:text-pink-500 underline cursor-pointer"
          >
            Vous pouvez renvoyer un email
          </button>
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="nom@exemple.com"
                  {...field}
                  className="py-6"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full py-6 text-lg bg-pink-500 hover:bg-pink-600 text-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Envoi...
            </>
          ) : (
            "Envoyer le lien de réinitialisation"
          )}
        </Button>
        <p className="text-center text-sm text-gray-500">
          <Link
            href={ROUTES.LOGIN}
            className="font-medium text-pink-600 hover:text-pink-500"
          >
            Retour à la connexion
          </Link>
        </p>
      </form>
    </Form>
  );
}
