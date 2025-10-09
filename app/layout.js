import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SessionProvider } from 'next-auth/react';
import SessionProviderWrapper from '../components/SessionProviderWrapper';
 
export const metadata = {
  title: "Alumni_Plus",
  description: "Connecting Cse students",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white">
        <SessionProviderWrapper>

          <Navbar />
          {children}
          <Footer />

        </SessionProviderWrapper>
      </body>
    </html>
  );
}
