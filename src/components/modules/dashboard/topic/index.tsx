"use client";

import { Tables } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import AgentSection from "./agent-section";
import AgentA from "./agents/agent-a";
import AgentB from "./agents/agent-b";
import AgentC from "./agents/agent-c";
import AgentD from "./agents/agent-d";
import {
  AgentAOutput,
  AgentBOutput,
  AgentCOutput,
  AgentDOutput,
  AGENTS,
} from "./types";

export default function Topic({
  serverSideTopic,
}: {
  serverSideTopic: Tables<"topics">;
}) {
  const [data, setData] = useState(serverSideTopic);

  useEffect(() => {
    const client = createClient();

    client
      .channel("room1")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "topics" },
        (payload: { new: Tables<"topics"> }) => {
          setData(payload.new);
        }
      )
      .subscribe();

    return () => {
      client.channel("room1").unsubscribe();
    };
  }, []);

  const regex = /```json\n([\s\S]*?)```/;
  const agentAOutput = JSON.parse(
    data.agent_a_output?.match(regex)?.[1] || "{}"
  ) as AgentAOutput[];

  const agentBOutput = JSON.parse(
    data.agent_b_output?.match(regex)?.[1] || "{}"
  ) as AgentBOutput[];

  const agentCOutput = JSON.parse(
    data.agent_c_output?.match(regex)?.[1] || "{}"
  ) as AgentCOutput;

  const agentDOutput = JSON.parse(
    data.agent_d_output?.match(regex)?.[1] || "{}"
  ) as AgentDOutput;

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-semibold">{data.topic}</h1>
      <div className="space-y-6 mt-8">
        <AgentSection agent={AGENTS[0]} status={data.agent_a_status}>
          {data.agent_a_output && <AgentA output={agentAOutput} />}
        </AgentSection>

        <AgentSection agent={AGENTS[1]} status={data.agent_b_status}>
          {data.agent_b_output && <AgentB output={agentBOutput} />}
        </AgentSection>

        <AgentSection agent={AGENTS[2]} status={data.agent_c_status}>
          {data.agent_c_output && <AgentC output={agentCOutput} />}
        </AgentSection>

        <AgentSection
          agent={AGENTS[3]}
          status={data.agent_d_status}
          defaultOpen
        >
          {data.agent_d_output && <AgentD output={agentDOutput} />}
        </AgentSection>
      </div>
    </div>
  );
}
