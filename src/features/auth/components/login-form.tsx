"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { useEffect, useState } from "react"; // Importer useState
import { Eye, EyeOff, Loader2 } from "lucide-react"; // Importer les icônes

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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ROUTES } from "@/constants/route";
import { signIn } from "next-auth/react";
import Link from "next/link";

const FormSchema = z.object({
  email: z.string().min(2, {
    message: "Votre email doit être unique.",
  }),
  password: z.string().min(8, {
    message: "Votre mot de passe doit contenir au moins 8 caractères.",
  }),
});

export function LoginForm() {
  const route = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // 1. Ajouter l'état pour la visibilité du mot de passe
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const error = searchParams.get("error");
    if (!error) return;

    if (error === "EmailExists") {
      toast.error(
        "Cet email est déjà utilisé avec un compte existant. Connectez-vous avec votre mot de passe.",
      );
    } else if (error === "GoogleAuthFailed") {
      toast.error("La connexion avec Google a échoué. Veuillez réessayer.");
    } else if (error === "CredentialsSignin") {
      toast.error("Email ou mot de passe invalide.");
    }

    const params = new URLSearchParams(searchParams.toString());
    params.delete("error");
    const query = params.toString();
    route.replace(query ? `${pathname}?${query}` : pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, pathname]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.ok) {
        toast.success("Connexion réussie !");
        route.push(ROUTES.DASHBOARD);
        form.reset();
      } else {
        toast.error("Email ou mot de passe invalide.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(`Erreur: ${error.message}`);
    }
  }

  return (
    <div className="space-y-6">
      <Button
        type="button"
        variant="outline"
        className="w-full py-6 text-lg gap-2 cursor-pointer bg-gray-200 hover:bg-gray-300 border border-gray-300 "
        onClick={() => signIn("google", { callbackUrl: ROUTES.DASHBOARD })}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path
            fill="#4285F4"
            d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.43 3.58v2.98h3.93c2.3-2.12 3.52-5.23 3.52-8.8z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.93-2.98c-1.09.73-2.5 1.16-4 1.16-3.08 0-5.68-2.08-6.61-4.87H1.34v3.07C3.31 21.3 7.34 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.39 14.4c-.24-.73-.38-1.5-.38-2.4s.14-1.67.38-2.4V6.53H1.34C.49 8.24 0 10.06 0 12s.49 3.76 1.34 5.47z"
          />
          <path
            fill="#EA4335"
            d="M12 4.77c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.94 1.19 15.24 0 12 0 7.34 0 3.31 2.7 1.34 6.53l4.05 3.07C6.32 6.85 8.92 4.77 12 4.77z"
          />
        </svg>
        Se connecter avec Google
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Ou continuer avec
          </span>
        </div>
      </div>

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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <FormLabel>Mot de passe</FormLabel>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm text-gray-500 hover:text-gray-600 underline"
                  >
                    Mot de passe oublié?
                  </Link>
                </div>
                {/* 2. Envelopper l'Input et l'icône dans un conteneur relatif */}
                <div className="relative">
                  <FormControl>
                    <Input
                      // 3. Changer le type en fonction de l'état
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...field}
                      className="py-6 pr-10" // Ajouter un padding à droite pour l'icône
                    />
                  </FormControl>
                  {/* 4. Ajouter l'icône et le gestionnaire de clic */}
                  <div
                    className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full py-6 text-lg bg-pink-500 hover:bg-pink-600 text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Connexion...
              </>
            ) : (
              "Se connecter"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
