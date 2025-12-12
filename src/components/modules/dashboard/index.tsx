"use client";

import { Button } from "@/components/ui/shadcn/button";
import { Spinner } from "@/components/ui/shadcn/spinner";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { createClient } from "@/utils/supabase/client";
import { SendIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Dashboard() {
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const triggerKestraFlow = async () => {
    if (!topic) return;

    try {
      setIsLoading(true);
      const client = createClient();
      const { data, error } = await client
        .from("topics")
        .insert({
          topic,
        })
        .select("id")
        .single();

      if (!data || error) {
        toast.error("Failed to create topic. Please try again.");
        setIsLoading(false);
        return;
      }

      const timestamp = new Date().getTime();
      await fetch(`/api/trigger-kestra-flow?_=${timestamp}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: {
            topic,
            topic_id: data.id,
          },
        }),
        cache: "no-store",
      });

      toast.info("Initialising research flow...");
      router.push(`/${data.id}`);
    } catch {
      toast.error("Failed to trigger kestra flow. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Textarea
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter your topic (min 10 characters)"
        required
      />
      <Button
        onClick={triggerKestraFlow}
        disabled={isLoading || !topic || topic.trim().length < 10}
      >
        {isLoading ? <Spinner /> : <SendIcon />}
      </Button>
    </div>
  );
}
