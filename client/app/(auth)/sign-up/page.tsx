"use client"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useCookies } from 'next-client-cookies';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';

const SignUpPage = () => {
    const cookies = useCookies()
    const token = cookies.get("token")

    const router = useRouter()

    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const response = axios.post("http://localhost:4000/api/auth/register", { name, email, password })
        response.then(res => {
            cookies.set("token", res.data.token)
            toast.success("signed In in successfully!")
            router.push("/")
        }).catch(err => {
            console.log(err)
        })
    }

    if (token !== undefined) {
        return <div className="flex w-full flex-col gap-y-3 justify-center items-center">
            You are already logged in
            <Button asChild variant={"primary"}>
                <Link href={"/"}>Go to home</Link>
            </Button>
        </div>
    }
    return (
        <Card className='w-full lg:w-[40%]'>
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className='flex justify-center flex-col items-center gap-y-3'>
                    <Input
                        className='border-neutral-200 rounded-md'
                        type='text'
                        onChange={(e) => { setName(e.target.value) }}
                        placeholder='Enter name...'
                    />
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
                        <Button size={"md"} className='w-full' variant={"primary"}>Sign Up</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default SignUpPage