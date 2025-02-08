// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import "@/app/globals.css";
import { Sidebar } from "./(components)/Sidebar";



export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    // const router = useRouter();

    // useEffect(() => {
    //     const cookies = document.cookie;
    //     const accessToken = cookies.split('; ').find(row => row.startsWith('access_token=')).split('=')[1];
    //     const userRole = cookies.split('; ').find(row => row.startsWith('user_role=')).split('=')[1];
    //     if (!accessToken) {
    //         router.push('/login');
    //     } else if (userRole === 'User') {
    //         router.push('/home');
    //     }
    // }, []);


    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <header>Admin Header</header>
            <main>{children}</main>
            <footer>Admin Footer</footer>
        </div>
    );
}
