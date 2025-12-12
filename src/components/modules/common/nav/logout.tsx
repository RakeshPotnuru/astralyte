"use client";

import { Button } from "@/components/ui/shadcn/button";
import { Spinner } from "@/components/ui/shadcn/spinner";
import { createClient } from "@/utils/supabase/client";
import { LogOutIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Logout() {
  const [isLoading, setIsLoading] = useState(false);

  const logout = async () => {
    const client = createClient();
    setIsLoading(true);

    try {
      const { error } = await client.auth.signOut();
      if (error) throw error;
      window.location.href = "/";
    } catch {
      toast.error("Failed to logout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={logout} variant="ghost" disabled={isLoading}>
      {isLoading ? <Spinner /> : <LogOutIcon />}
      Logout
    </Button>
  );
}
