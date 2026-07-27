"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AvatarUploader from "@/components/dashboard/avatar-uploader";
import { UserDto } from "@/features/users/types/user.types";
import {
  changePasswordSchema,
  ChangePasswordFormValues,
  profileInfoSchema,
  ProfileInfoFormValues,
} from "@/features/users/schemas/profile-schema";
import {
  changePasswordAction,
  updateCurrentUserAction,
} from "@/features/users/actions/profile.actions";

interface ProfileFormProps {
  user: UserDto;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const { update } = useSession();
  const [imageUrl, setImageUrl] = useState(user.imageUrl);

  const infoForm = useForm<ProfileInfoFormValues>({
    resolver: zodResolver(profileInfoSchema),
    defaultValues: {
      username: user.username,
      phone: user.phone ?? "",
      address: user.address ?? "",
    },
  });

  const onSubmitInfo = async (values: ProfileInfoFormValues) => {
    const result = await updateCurrentUserAction(values);
    if (result.success) {
      toast.success("Profil mis à jour avec succès !");
    } else {
      toast.error(result.error);
    }
  };

  const handleAvatarUploadSuccess = async (url: string) => {
    setImageUrl(url);
    const result = await updateCurrentUserAction({
      username: user.username,
      phone: user.phone,
      address: user.address,
      imageUrl: url,
    });
    if (result.success) {
      await update({ image: url });
      toast.success("Photo de profil mise à jour avec succès !");
    } else {
      toast.error(result.error);
    }
  };

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordForm = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmitPassword = async (values: ChangePasswordFormValues) => {
    const result = await changePasswordAction({
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    });
    if (result.success) {
      toast.success(result.message);
      passwordForm.reset();
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden border-pink-100 shadow-sm">
        <CardHeader className="bg-gradient-to-r from-pink-500 to-pink-600 text-white">
          <CardTitle>Informations personnelles</CardTitle>
          <CardDescription className="text-pink-100">
            Gérez votre photo de profil et vos informations personnelles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 p-8">
          <div className="flex items-center gap-6">
            <AvatarUploader
              currentImageUrl={imageUrl}
              fallbackText={getInitials(user.username)}
              onUploadSuccess={handleAvatarUploadSuccess}
            />
            <div>
              <p className="text-lg font-semibold text-gray-900">
                {user.username}
              </p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          <Form {...infoForm}>
            <form
              onSubmit={infoForm.handleSubmit(onSubmitInfo)}
              className="space-y-6"
            >
              <div>
                <FormLabel className="text-gray-700 font-medium">
                  Adresse email
                </FormLabel>
                <Input
                  value={user.email}
                  disabled
                  className="py-6 mt-2 bg-gray-50"
                />
                <p className="mt-2 text-sm text-gray-500">
                  L&apos;adresse email ne peut pas être modifiée.
                </p>
              </div>

              <FormField
                control={infoForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Nom d&apos;utilisateur
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="py-6" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={infoForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Téléphone
                      </FormLabel>
                      <FormControl>
                        <Input {...field} className="py-6" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={infoForm.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Adresse
                      </FormLabel>
                      <FormControl>
                        <Input {...field} className="py-6" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end pt-6 border-t border-gray-100">
                <Button
                  type="submit"
                  disabled={infoForm.formState.isSubmitting}
                  className="px-8 py-2 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-medium cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {infoForm.formState.isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    "Enregistrer les modifications"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-pink-100 shadow-sm">
        <CardHeader className="bg-gradient-to-r from-pink-500 to-pink-600 text-white">
          <CardTitle>Sécurité</CardTitle>
          <CardDescription className="text-pink-100">
            Gérez la sécurité de votre compte
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          {user.authProvider === "GOOGLE" ? (
            <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-6">
              <ShieldCheck className="h-8 w-8 shrink-0 text-pink-500" />
              <p className="text-sm text-gray-600">
                Vous êtes connecté via Google. La gestion de votre mot de
                passe se fait directement depuis votre compte Google.
              </p>
            </div>
          ) : (
            <Form {...passwordForm}>
              <form
                onSubmit={passwordForm.handleSubmit(onSubmitPassword)}
                className="space-y-6"
              >
                <FormField
                  control={passwordForm.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Mot de passe actuel
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showCurrentPassword ? "text" : "password"}
                            {...field}
                            className="py-6 pr-10"
                          />
                        </FormControl>
                        <div
                          className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
                          onClick={() =>
                            setShowCurrentPassword((prev) => !prev)
                          }
                        >
                          {showCurrentPassword ? (
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

                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Nouveau mot de passe
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showNewPassword ? "text" : "password"}
                            {...field}
                            className="py-6 pr-10"
                          />
                        </FormControl>
                        <div
                          className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
                          onClick={() => setShowNewPassword((prev) => !prev)}
                        >
                          {showNewPassword ? (
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

                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Confirmer le nouveau mot de passe
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            {...field}
                            className="py-6 pr-10"
                          />
                        </FormControl>
                        <div
                          className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
                          onClick={() =>
                            setShowConfirmPassword((prev) => !prev)
                          }
                        >
                          {showConfirmPassword ? (
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

                <div className="flex justify-end pt-6 border-t border-gray-100">
                  <Button
                    type="submit"
                    disabled={passwordForm.formState.isSubmitting}
                    className="px-8 py-2 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-medium cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {passwordForm.formState.isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Mise à jour...
                      </>
                    ) : (
                      "Changer le mot de passe"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
