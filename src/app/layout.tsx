import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ミラレル cockpit",
  icons: {
    icon: "/favicon.svg",
  },
  description: "ミラレル管理サイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
