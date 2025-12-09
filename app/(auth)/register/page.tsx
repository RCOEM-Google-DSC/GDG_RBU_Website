"use client";

import React, { useState } from 'react';
import * as z from "zod";
import { User, Mail, ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { RegisterForm } from '@/app/Components/Auth/RegisterForm';

const schema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d|(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])).+$/, { message: "Password requirements not met" }),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

const RegisterPage = () => {
    const handleSubmit = async (data: any) => {
        console.log("submitted", data)
    }

    return (
        <div className="grid grid-cols-2  min-h-screen w-full p-10">
            {/* Left Panel - Form */}
            <div className=''>
                <RegisterForm />
            </div>

            {/* Right Panel - Branding */}
            <div>
                
            </div>
        </div>
    )
}

export default RegisterPage