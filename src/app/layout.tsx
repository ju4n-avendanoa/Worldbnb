import type { Metadata } from "next";
import { Inter, Noto_Sans, Lato, Mulish } from "next/font/google";
import { Toaster } from "sonner";
import NavBar from "@/components/navbar/NavBar";
import Provider from "@/context/Provider";
import LoadProvider from "@/context/LoadProvider";
import "./globals.css";

const mulish = Mulish({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Worldbnb",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Provider>
        <body className={`${mulish.className} min-h-screen`}>
          <LoadProvider>
            <NavBar />
            {children}
            <Toaster richColors={true} closeButton={true} />
          </LoadProvider>
        </body>
      </Provider>
    </html>
  );
}
