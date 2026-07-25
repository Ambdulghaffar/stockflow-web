import { AuthVisualSection } from "@/components/auth-visual-section";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";

interface ResetPasswordPageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const { token } = await searchParams;

  return (
    <div className="flex min-h-screen bg-white">
      <AuthVisualSection
        title="Nouveau mot de passe"
        description="Choisissez un mot de passe sécurisé pour votre compte."
      />

      {/* Section droite avec le formulaire */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Nouveau mot de passe
            </h2>
            <p className="text-gray-500 mt-2">
              Choisissez un mot de passe sécurisé pour votre compte.
            </p>
          </div>
          <ResetPasswordForm token={token} />
        </div>
      </div>
    </div>
  );
}
