"use client";

import { Tables } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";
import type { RealtimeChannel } from "@supabase/supabase-js";
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
  serverTopic,
}: {
  serverTopic: Tables<"topics">;
}) {
  const [data, setData] = useState(serverTopic);

  useEffect(() => {
    const client = createClient();
    let channel: RealtimeChannel;

    const setupRealtime = async () => {
      await client.realtime.setAuth();

      channel = client
        .channel(`topic:${serverTopic.id}`, {
          config: { private: true },
        })
        .on("broadcast", { event: "UPDATE" }, ({ payload }) => {
          setData(payload.record as Tables<"topics">);
        })
        .subscribe();
    };

    setupRealtime();

    return () => {
      if (channel) {
        client.removeChannel(channel);
      }
    };
  }, [serverTopic.id]);

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
          {data.agent_a_status === "Success" ? (
            <AgentA output={agentAOutput} />
          ) : (
            data.agent_a_output
          )}
        </AgentSection>

        <AgentSection agent={AGENTS[1]} status={data.agent_b_status}>
          {data.agent_b_status === "Success" ? (
            <AgentB output={agentBOutput} />
          ) : (
            data.agent_b_output
          )}
        </AgentSection>

        <AgentSection agent={AGENTS[2]} status={data.agent_c_status}>
          {data.agent_c_status === "Success" ? (
            <AgentC output={agentCOutput} />
          ) : (
            data.agent_c_output
          )}
        </AgentSection>

        <AgentSection
          agent={AGENTS[3]}
          status={data.agent_d_status}
          defaultOpen
        >
          {data.agent_d_status === "Success" ? (
            <AgentD output={agentDOutput} />
          ) : (
            data.agent_d_output
          )}
        </AgentSection>
      </div>
    </div>
  );
}
