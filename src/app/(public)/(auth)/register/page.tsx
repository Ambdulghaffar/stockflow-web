import { AuthVisualSection } from "@/components/auth-visual-section";
import { RegisterForm } from "@/features/auth/components/register-form";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen bg-white">
      <AuthVisualSection
        title="Rejoignez Électro-Chic"
        description="Créez votre compte pour accéder à un monde d'innovations et de style."
      />

      {/* Section droite avec le formulaire */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <div className="text-left mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Inscrivez-vous
            </h2>
            <p className="text-gray-500 mt-2">
              Vous avez déjà un compte ?{" "}
              <Link
                href="/login"
                className="font-medium text-pink-600 hover:text-pink-500"
              >
                Connectez-vous
              </Link>
            </p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
