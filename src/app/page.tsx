import Auth from "@/components/modules/auth";
import Dashboard from "@/components/modules/dashboard";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const client = await createClient();

  const {
    data: { user },
  } = await client.auth.getUser();

  return user ? <Dashboard /> : <Auth />;
}
