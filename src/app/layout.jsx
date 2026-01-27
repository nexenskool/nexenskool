import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/store/Provider";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "NexenSkool",
  description:
    "NexenSkool is an education-focused technology platform that provides software development services, academic and research guidance, professional training, and consultancy support. It aims to bridge the gap between education and practical technology skills through learning resources, project support, and technical solutions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable}  antialiased`}>
        <ReduxProvider>{children}</ReduxProvider>

        <Toaster richColors />
      </body>
    </html>
  );
}
