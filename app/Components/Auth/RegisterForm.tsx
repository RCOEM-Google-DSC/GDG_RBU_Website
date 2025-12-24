"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import Image from "next/image"
import { Button } from "@/components/ui/button"

import {
    Field,
    FieldError,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { supabase } from "@/supabase/supabase"
import { Eye, EyeOff } from "lucide-react"
import GoogleLogo from "../Reusables/GoogleLogo"
import { generateProfileImageUrl } from "@/lib/utils"


const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
    email: z.email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),

})

export function RegisterForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            setIsLoading(true);

            // Sign up with Supabase Auth
            const { data: authData, error: signUpError } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        full_name: data.name,
                    },
                    emailRedirectTo: `${window.location.origin}/api/auth/callback`,
                }
            });

            if (signUpError) {
                toast.error("Registration Failed", {
                    description: signUpError.message,
                    position: "bottom-right",
                });
                return;
            }

            if (authData.user) {
                // Check if email confirmation is required
                if (authData.session) {
                    // User is immediately confirmed - create user record
                    const profileImageUrl = generateProfileImageUrl(data.name, data.email);
                    
                    const { error: insertError } = await supabase.from("users").insert({
                        id: authData.user.id,
                        email: data.email,
                        name: data.name,
                        image_url: profileImageUrl,
                        provider: 'email',
                        role: 'user',
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                    });

                    if (insertError) {
                        console.error("Error creating user record:", insertError);
                        toast.error("Registration Error", {
                            description: "Could not create user profile. Please contact support.",
                            position: "bottom-right",
                        });
                        return;
                    }

                    toast.success("Registration Successful!", {
                        description: "Redirecting to your profile...",
                        position: "bottom-right",
                    });

                    // Redirect to profile page
                    setTimeout(() => {
                        window.location.href = '/profile';
                    }, 1000);
                } else {
                    // Email confirmation required
                    toast.success("Registration Successful!", {
                        description: "Please check your email to confirm your account.",
                        position: "bottom-right",
                    });

                    // Redirect to login page after a delay
                    setTimeout(() => {
                        window.location.href = '/login';
                    }, 3000);
                }
            }
        } catch (error) {
            console.error("Registration error:", error);
            toast.error("Registration Failed", {
                description: "An unexpected error occurred. Please try again.",
                position: "bottom-right",
            });
        } finally {
            setIsLoading(false);
        }
    }

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function handleOAuthLogin(provider: 'github' | 'google') {
        try {
            setIsLoading(true);
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: provider,
                options: {
                    redirectTo: `${window.location.origin}/api/auth/callback`,
                }
            });

            if (error) {
                toast.error("Authentication Error", {
                    description: error.message,
                    position: "bottom-right",
                });
            }
        } catch (error) {
            toast.error("Authentication Error", {
                description: "An unexpected error occurred. Please try again.",
                position: "bottom-right",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full max-w-md mx-auto p-8 bg-white rounded-lg">
            {/* Social Login Buttons */}
            <div className="flex gap-4 mb-6">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleOAuthLogin('github')}
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center gap-2 py-6 border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                >
                    <Image src="/icons/github.svg" alt="GitHub Logo" width={20} height={20} />
                    <span className="text-gray-700">GitHub</span>
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleOAuthLogin('google')}
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center gap-2 py-6 border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                >
                    <GoogleLogo />
                    <span className="text-gray-700">Google</span>
                </Button>
            </div>

            {/* OR Divider */}
            <div className="relative mb-6">
                <Separator className="bg-gray-300" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-gray-500">
                    OR
                </span>
            </div>

            {/* Form */}
            <form id="registerform" onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="name" className="text-sm text-gray-600">
                                Name
                            </FieldLabel>
                            <Input
                                {...field}
                                id="name"
                                placeholder="John Doe"
                                autoComplete="off"
                                className="border-0 border-b border-gray-300 rounded-none px-0 focus-visible:ring-0 focus-visible:border-gray-500"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="email" className="text-sm text-gray-600">
                                Email ID
                            </FieldLabel>
                            <Input
                                {...field}
                                id="email"
                                type="email"
                                aria-invalid={fieldState.invalid}
                                placeholder="jhondoe@gmail.com"
                                autoComplete="off"
                                className="border-0 border-b border-gray-300 rounded-none px-0 focus-visible:ring-0 focus-visible:border-gray-500"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="password" className="text-sm text-gray-600">
                                Password
                            </FieldLabel>
                            <div className="relative">
                                <Input
                                    {...field}
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Minimum 8 characters"
                                    autoComplete="off"
                                    className="border-0 border-b border-gray-300 rounded-none px-0 pr-12 focus-visible:ring-0 focus-visible:border-gray-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <Eye /> : <EyeOff />}
                                </button>
                            </div>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Button
                    type="submit"
                    form="registerform"
                    disabled={isLoading}
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white py-6 text-lg font-medium rounded-md disabled:opacity-50"
                >
                    {isLoading ? "Registering..." : "Register"}
                </Button>
            </form>

            {/* Footer */}
            <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <a href="/login" className="text-gray-800 font-medium hover:underline">
                        Login Now
                    </a>
                </p>
            </div>
        </div>
    )
}
