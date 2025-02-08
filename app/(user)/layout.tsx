import TopBar from "./(components)/Topbar";

export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div >
            <TopBar />
            <header>User Header</header>
            <main>{children}</main>
            <footer>User Footer</footer>
        </div>
    );
}
