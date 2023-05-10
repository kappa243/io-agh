import "bootstrap/dist/css/bootstrap.min.css";
import { Inter } from 'next/font/google';
import DebugNavbar from "@/components/DebugNavbar";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'IO IO IO',
  description: 'IO IO IO',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DebugNavbar />
        {children}
      </body>
    </html>
  )
}
