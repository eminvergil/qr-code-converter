import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "QR Code Converter",
  description: "Convert an URL to QR Code",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <footer className="mt-8 text-center text-sm text-gray-500">
          <a
            href="https://github.com/eminvergil"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center hover:text-gray-700 transition-colors"
          >
            <Github className="h-4 w-4 mr-2" />
            View on GitHub
          </a>
          <p className="mt-2">Made with ❤️ by Emin Vergil</p>
        </footer>
      </body>
    </html>
  );
}
