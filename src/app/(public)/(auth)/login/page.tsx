import { AuthVisualSection } from "@/components/auth-visual-section";
import { LoginForm } from "@/features/auth/components/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-white">
      <AuthVisualSection
        title="Bienvenue chez Électro-Chic"
        description="Découvrez l'excellence technologique et le design à portée de main."
      />

      {/* Section droite avec le formulaire */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 ">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 ">
            <h2 className="text-3xl font-bold text-gray-900">
              Connectez-vous
            </h2>
            <p className="text-gray-500 mt-2">
              Pas encore de compte ?{" "}
              <Link
                href="/register"
                className="font-medium text-pink-600 hover:text-pink-500"
              >
                Inscrivez-vous
              </Link>
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
