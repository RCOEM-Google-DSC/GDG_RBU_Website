"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import Image from "next/image"
import Link from "next/link"
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


const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password is required" }),
})

export function LoginForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            setIsLoading(true);

            // Sign in with Supabase Auth
            const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            });

            if (signInError) {
                toast.error("Login Failed", {
                    description: signInError.message,
                    position: "bottom-right",
                });
                return;
            }

            if (authData.user) {
                toast.success("Login Successful!", {
                    description: "Redirecting to your profile...",
                    position: "bottom-right",
                });

                // Redirect to profile page
                setTimeout(() => {
                    window.location.href = '/profile';
                }, 1000);
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Login Failed", {
                description: "An unexpected error occurred. Please try again.",
                position: "bottom-right",
            });
        } finally {
            setIsLoading(false);
        }
    }

    async function handleOAuthLogin(provider: 'github' | 'google') {
        try {
            setIsLoading(true);
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: provider,
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
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
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
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
            <form id="loginform" onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                                autoComplete="email"
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
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
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

                <div className="text-right">
                    <Link href="/forgot-password" className="text-sm text-gray-600 hover:text-gray-800">
                        Forgot Password?
                    </Link>
                </div>

                <Button
                    type="submit"
                    form="loginform"
                    disabled={isLoading}
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white py-6 text-lg font-medium rounded-md disabled:opacity-50"
                >
                    {isLoading ? "Logging in..." : "Login"}
                </Button>
            </form>

            {/* Footer */}
            <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-gray-800 font-medium hover:underline">
                        Register Now
                    </Link>
                </p>
            </div>
        </div>
    )
}
