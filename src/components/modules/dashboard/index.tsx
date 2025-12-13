"use client";

import { Center } from "@/components/ui/center";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/shadcn/input-group";
import { Spinner } from "@/components/ui/shadcn/spinner";
import { createClient } from "@/utils/supabase/client";
import { ArrowUpIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Starters from "./starters";

export default function Dashboard() {
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const triggerKestraFlow = async (topicOverride?: string) => {
    const activeTopic = topicOverride || topic;
    if (!activeTopic) return;

    try {
      setIsLoading(true);
      toast.info("Initialising research flow...");

      const client = createClient();
      const { data, error } = await client
        .from("topics")
        .insert({
          topic: activeTopic,
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
            topic: activeTopic,
            topic_id: data.id,
          },
        }),
        cache: "no-store",
      });

      toast.success("Research flow initialised successfully.");
      router.push(`/${data.id}`);
    } catch {
      toast.error("Failed to trigger kestra flow. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Center className="h-[calc(100dvh-180px)]">
      <div className="md:w-[80%] lg:w-[60%] space-y-40">
        <h1 className="text-6xl font-bold text-center">
          What&apos;s on your mind?
        </h1>
        <div className="space-y-6">
          <Starters onClick={triggerKestraFlow} />
          <InputGroup>
            <InputGroupTextarea
              placeholder="Enter your topic (min 10 characters)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <InputGroupAddon align="block-end">
              <InputGroupButton
                variant="default"
                className="rounded-md shadow ml-auto"
                size="icon-xs"
                onClick={() => triggerKestraFlow()}
                disabled={isLoading || !topic || topic.trim().length < 10}
              >
                {isLoading ? <Spinner /> : <ArrowUpIcon />}
                <span className="sr-only">Send</span>
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
    </Center>
  );
}
