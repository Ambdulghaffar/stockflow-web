import { AuthVisualSection } from "@/components/auth-visual-section";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen bg-white">
      <AuthVisualSection
        title="Mot de passe oublié ?"
        description="Pas de souci, ça arrive à tout le monde."
      />

      {/* Section droite avec le formulaire */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Mot de passe oublié ?
            </h2>
            <p className="text-gray-500 mt-2">
              Entrez votre email pour recevoir un lien de réinitialisation.
            </p>
          </div>
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
