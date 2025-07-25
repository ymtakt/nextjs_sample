import "../globals.css";
import Navigation from "@/components/general/Sidebar";
import Header from "@/components/general/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ミラレル cockpit",
  description: "ミラレル管理サイト",
};

const userName = "ユーザー名";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex flex-col">
      <Header userName={userName} />
      <main className="flex-1 flex ">
        <div>
          <Navigation />
        </div>
        <div className="overflow-x-hidden">{children}</div>
      </main>
    </div>
  );
}
