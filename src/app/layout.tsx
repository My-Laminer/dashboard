import Header from "@/components/layout/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Calculadora de Tejados',
  description: 'Sistema de cálculo y gestión de proyectos de tejados',
};
const mockUser = {
  name: 'Juan Pérez',
  email: 'juan@ejemplo.com',
  role: 'Administrador'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <Header user={mockUser} />
          <main className="pt-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
