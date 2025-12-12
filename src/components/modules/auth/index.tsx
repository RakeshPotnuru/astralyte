"use client";

import { Center } from "@/components/ui/center";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import { Spinner } from "@/components/ui/shadcn/spinner";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { toast } from "sonner";

export default function Auth() {
  const [email, setEmail] = useState<string>();
  const [step, setStep] = useState<"email" | "confirm">("email");
  const [isLoading, setIsLoading] = useState(false);

  const auth = async () => {
    if (!email) return;
    const client = createClient();

    try {
      setIsLoading(true);
      const { error } = await client.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/confirm`,
        },
      });
      if (error) throw error;
      setStep("confirm");
    } catch {
      toast.error("Failed to send magic link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Center className="min-h-screen px-10 md:px-20 text-center flex flex-col gap-10 relative -mt-20">
      <h1 className="font-black text-6xl md:text-8xl">
        Multi-Agent <br />
        Research Assistant
      </h1>
      <div className="flex w-full max-w-md mx-auto">
        {step === "confirm" ? (
          <p className="text-muted-foreground mx-auto">
            A link has been sent to your inbox. Please click the link to
            continue.
          </p>
        ) : (
          <div className="gap-2 flex flex-row w-full">
            <Input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Your Email"
              required
              disabled={isLoading}
            />
            <Button onClick={auth} disabled={isLoading}>
              {isLoading && <Spinner />} Get Started
            </Button>
          </div>
        )}
      </div>
    </Center>
  );
}
