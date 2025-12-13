import Nav from "@/components/modules/common/nav";
import { createClient } from "@/utils/supabase/server";
import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/lib/providers";

export const metadata: Metadata = {
  title: "Astralyte",
  description: "Multi-Agent Research Assistant",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Providers>
          <Nav user={user} />
          <main className="p-5 md:p-10">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
