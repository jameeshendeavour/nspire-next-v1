"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";



export default function LoginPage() {
    const AUTH_SERVER_URL = "https://dev-auth-server.nspireinsights.com/auth";
    const CLIENT_ID = "nspire-portal";
    const REDIRECT_URI = "http://localhost:3000/api/callback";


    const generateCodeVerifier = () => {
        const array = new Uint32Array(32);
        window.crypto.getRandomValues(array);
        return Array.from(array, (num) => (`0${(num % 256).toString(16)}`).slice(-2)).join("");
    };

    const generateCodeChallenge = async (verifier: string) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(verifier);
        const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return btoa(String.fromCharCode.apply(null, hashArray))
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");
    };

    const handleLogin = async () => {
        const verifier = generateCodeVerifier();
        localStorage.setItem("codeVerifier", verifier);
        document.cookie = `AuthToken=${verifier}; path=/; max-age=3600`; // 1 hour expiry
        document.cookie = `userRole=${'Admin'}; path=/; max-age=3600`; // 1 hour expiry
        const challenge = await generateCodeChallenge(verifier);

        const authUrl = `${AUTH_SERVER_URL}/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&code_challenge=${challenge}&code_challenge_method=S256`;
        window.location.href = authUrl;
    };



    return (
        <div className="flex min-h-screen bg-[url('/images/bg.webp')] bg-cover bg-center w-full justify-end">
            <Card className="flex justify-center items-center w-[500px] backdrop-blur-md bg-white/30 border border-white/20 rounded-none">
                <CardContent className="flex flex-col items-center">
                    <h1 className="text-4xl font-bold mb-4 text-primary-foreground">n<span className="text-secondary">S</span>pire</h1>

                    <div className="h-16 flex justify-center items-center">
                        <Button onClick={handleLogin} className="w-full bg-secondary hover:bg-secondary/90">
                            Login with Nspire Insights
                        </Button>
                    </div>

                    <p className="text-sm text-muted mt-4 max-w-[300px] text-center">
                        By clicking this button, you agree to our &nbsp;
                        <a href="/terms" className="text-primary hover:underline">Terms of Service</a>
                        &nbsp; and &nbsp;
                        <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
