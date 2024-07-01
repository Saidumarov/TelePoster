import { Montserrat } from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/layout/header";
import { ThemeProvider } from "@/context/theme-provider";
import { Toaster } from "react-hot-toast";
import UserProvider from "@/context/user";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "TelePoster.uz",
  description: "Hello this is TelePoster.uz site",
  author: "TelePoster",
  Header: "Hello this is TelePoster.uz",
  keywords: "TelePoster",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <Toaster position="top-right" reverseOrder={false} />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
