import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import { Toaster } from "react-hot-toast";
import { getCurrentUser } from "./actions/getCurrentUser";
import LoginModal from "./components/modals/LoginModal";
import AddProjectModal from "./components/modals/AddProjectModal";
import { SafeUser } from "./types";
import Search from "./components/inputs/Search";
import NextTopLoader from "nextjs-toploader";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = (await getCurrentUser()) as SafeUser;
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-black  bg-gradient-to-br text-white from-black/20  to-slate-800 `}
      >
        <RegisterModal />
        <AddProjectModal />
        <LoginModal />
        <Toaster />
        <Navbar currentUser={currentUser} />
        <Search />
        <hr />
        <NextTopLoader />
        {children}
      </body>
    </html>
  );
}
