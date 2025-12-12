"use client";

import { Tables } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function Topic({
  serverSideTopic,
}: {
  serverSideTopic: Tables<"topics">;
}) {
  const [topic, setTopic] = useState(serverSideTopic);

  useEffect(() => {
    const client = createClient();

    client
      .channel("room1")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "topics" },
        (payload: { new: Tables<"topics"> }) => {
          setTopic(payload.new);
        }
      )
      .subscribe();

    return () => {
      client.channel("room1").unsubscribe();
    };
  }, []);

  return <div>{topic.topic}</div>;
}
