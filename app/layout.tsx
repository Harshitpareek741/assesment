import "./globals.css";
import { Header } from "./component/Header";
import { Footer } from "./component/Footer";
import { UserProvider } from "./context/usercontext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-screen min-w-screen overflow-x-hidden">
      <UserProvider>
        <Header />        
        <main className="">{children}</main>
        <Footer />
        </UserProvider>
      </body>

    </html>
  );
}
