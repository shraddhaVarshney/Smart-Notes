"use client"
import React from 'react'
import { Button } from './ui/button'
import { redirect, usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCookies } from 'next-client-cookies'
import { LogOut } from 'lucide-react';
import { LogIn } from 'lucide-react';
import { UserRoundPlus } from 'lucide-react';

const Navbar = () => {
    const pathname = usePathname()
    const isSignIn = pathname === "/sign-in"
    const cookies = useCookies()
    const token = cookies.get("token")
    const router = useRouter()

    const handleLogout = () => {
        cookies.remove("token")
        router.push("/sign-in")
    }

    return (
        <div className="w-full flex justify-between items-center">
            <div className="flex items-center py-3 font-bold text-[30px]">Smart Notes</div>
            {token === undefined ? (<div className="flex justify-center items-center">
                <Button asChild variant={"secondary"} size={"sm"} >
                    <Link href={token === undefined && isSignIn ? "/sign-up" : "/sign-in"}>
                        {isSignIn ? <UserRoundPlus /> : <LogIn />}
                        {token === undefined && isSignIn ? "Sign Up" : "Sign In"}
                    </Link>

                </Button>
            </div>) : (
                <Button onClick={handleLogout} variant={"secondary"} size={"sm"} >
                    <LogOut /> Log out
                </Button>
            )}
        </div>
    )
}

export default Navbar