"use client"
import React, { useState } from 'react'
import { useCookies } from 'next-client-cookies';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { redirect, useRouter } from 'next/navigation';
import axios from 'axios';

const SignInPage = () => {
    const cookies = useCookies()
    const router = useRouter()
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await axios.post("http://localhost:4000/api/auth/login", { email, password })
            .then(res => {
                if (res.status === 201) {
                    cookies.set("token", res.data.token)
                    toast.success("Signed in successfully!")
                    router.push("/")
                } else if (res.status === 200) {
                    toast.error(res.data.message)
                }
            }).catch(err => {
                toast.error("Something went wrong!")
            })
    }
    return (
        <Card className='w-full lg:w-[40%]'>
            <CardHeader>
                <CardTitle>Sign In</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className='flex justify-center flex-col items-center gap-y-3'>
                    <Input
                        className='border-neutral-200 rounded-md'
                        type='email'
                        onChange={(e) => { setEmail(e.target.value) }}
                        placeholder='Enter email...'
                    />
                    <Input
                        className='border-neutral-200 rounded-md'
                        type='password'
                        onChange={(e) => { setPassword(e.target.value) }}
                        placeholder='Enter password...'
                    />
                    <div className="w-full flex justify-center items-center">
                        <Button size={"md"} className='w-full' variant={"primary"}>Sign in</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default SignInPage