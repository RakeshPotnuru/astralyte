import { Badge } from "@/components/ui/shadcn/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/shadcn/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/shadcn/collapsible";
import { Spinner } from "@/components/ui/shadcn/spinner";
import {
  ChevronDownIcon,
  CircleCheckIcon,
  CircleDashedIcon,
  CircleXIcon,
} from "lucide-react";
import { useState } from "react";
import { AgentInfo, AgentStatus } from "./types";

interface AgentSectionProps {
  agent: AgentInfo;
  status: AgentStatus;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const statusMap = {
  Success: {
    icon: <CircleCheckIcon className="size-4" />,
    className: "text-success bg-success/20",
  },
  Failed: {
    icon: <CircleXIcon className="size-4" />,
    className: "text-destructive bg-destructive/20",
  },
  "Not Started": {
    icon: <CircleDashedIcon className="size-4" />,
    className: "text-gray-500 bg-gray-500/20",
  },
};

export default function AgentSection({
  agent,
  status,
  children,
  defaultOpen,
}: AgentSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen && status === "Success");

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card>
        <CollapsibleTrigger className="w-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-${agent.color}/10`}
                >
                  {agent.icon}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg text-foreground">
                      {agent.name}
                    </h3>
                    {status === "Pending" ? (
                      <Spinner />
                    ) : (
                      <Badge className={`${statusMap[status].className}`}>
                        {statusMap[status].icon} {status}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {agent.description}
                  </p>
                </div>
              </div>

              <ChevronDownIcon
                className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent>{children}</CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
