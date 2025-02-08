"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import Loader from './Loader';


export default function LoginPage() {
    const CLIENT_ID = "nspire-portal";
    const REDIRECT_URI = "http://localhost:3000/api/callback";
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const code = query.get("code");

        if (code) {
            fetchToken(code);
        }
    }, []);


    const fetchToken = async (code: string) => {
        const codeVerifier = localStorage.getItem("codeVerifier");

        fetch("/api/proxy", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                client_id: CLIENT_ID,
                code,
                redirect_uri: REDIRECT_URI,
                code_verifier: codeVerifier || "",
            }),
        }).then(response => {
            if (response.ok) {
                response.json().then(res => {
                    setIsLoading(false);
                    document.cookie = `access_token=${res.data.access_token}; path=/;`;
                    document.cookie = `refresh_token=${res.data.refresh_token}; path=/;`;
                    document.cookie = `user_role=Admin; path=/;`;
                    router.push("/home");
                });
            }
        }).catch(() => {

            setIsLoading(false);
        });

    };

    return (
        <div className="flex min-h-screen bg-[url('/images/bg.webp')] bg-cover bg-center w-full justify-end">
            <Card className="flex flex-col justify-center items-center w-[500px] backdrop-blur-md bg-white/30 border border-white/20 rounded-none">
                <h1 className="text-4xl font-bold mb-4 text-primary-foreground">n<span className="text-secondary">S</span>pire</h1>
                <div>{isLoading ? <Loader /> : <div className="h-16"></div>}</div>


                <p className="text-sm text-muted mt-4 max-w-[300px] text-center">
                    By clicking this button, you agree to our &nbsp;
                    <a href="/terms" className="text-primary hover:underline">Terms of Service</a>
                    &nbsp; and &nbsp;
                    <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
                </p>
            </Card>
        </div>
    );
}
