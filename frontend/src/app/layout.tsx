import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProviders from "@/providers/AuthProviders";

const inter = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blogeq",
  description: "Blogeq",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.className}>
        <ToastContainer />
        <AuthProviders>{children}</AuthProviders>
      </body>
    </html>
  );
}
