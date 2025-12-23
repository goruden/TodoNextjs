'use client'

import { useState } from "react"
import SignUp from "../components/SignUp"
import SignIn from "../components/SignIn"

export default function AuthPage() {
    const [isSignUp, setIsSignUp] = useState(false)

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-700 flex-col">

            {isSignUp ? <SignUp setIsSignUp={setIsSignUp} /> : <SignIn setIsSignUp={setIsSignUp} />}
        </div>
    )
}