"use client";

import React from 'react'
import Form from '@/app/Components/Reusables/Form'

import * as z from "zod"
import { User } from 'lucide-react';
const schema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }).regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
        { message: "Password must include uppercase, lowercase, number, and special character" }
    )
});
const page = () => {
    const handleSubmit = async () => {
        console.log("submitted")
    }
    return (
        <div className='grid grid-cols-2 min-h-screen'>
            {/* left form */}
            <div className=''>
                <Form
                    title='Sign Up'
                    description='Create a new account'
                    schema={schema}
                    defaultValues={{
                        name: '',
                        email: '',
                        password: '',
                    }}
                    onSubmit={handleSubmit}
                >
                    <Form.Group>
                        <Form.InputField
                            name='name'
                            label='Name'
                            placeholder='Enter your name'
                            icon={<User />}
                        />

                        <Form.InputField
                            name='email'
                            label='Email'
                            placeholder='Enter your email'
                            icon={<User />}
                        />
                        <Form.PasswordField
                            name='password'
                            label='Password'
                            placeholder='Enter your password'
                        />


                        <Form.Submit>
                            Create Account
                        </Form.Submit>
                    </Form.Group>
                </Form>
            </div>

            {/* right image */}
            <div></div>
        </div>
    )
}

export default page