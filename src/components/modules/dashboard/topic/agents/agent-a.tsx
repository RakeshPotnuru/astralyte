import { Card, CardContent, CardFooter } from "@/components/ui/shadcn/card";
import { ExternalLinkIcon } from "lucide-react";
import type { AgentAOutput } from "../types";

export default function AgentA({ output }: { output: AgentAOutput[] }) {
  return (
    <div className="space-y-3">
      {output.map((source, index) => (
        <Card
          key={index}
          className="bg-accent/5 hover:border-primary/50 transition-colors gap-2"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardContent className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h4 className="font-medium truncate">{source.title}</h4>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-blue-500 hover:underline mt-1"
              >
                <ExternalLinkIcon className="w-3 h-3" />
                <span className="truncate max-w-[200px]">{source.url}</span>
              </a>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-muted-foreground">{source.summary}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
