import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/shadcn/accordion";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/shadcn/alert";
import { Card } from "@/components/ui/shadcn/card";
import { AlertTriangleIcon, ExternalLinkIcon } from "lucide-react";
import type { AgentBOutput } from "../types";

export default function AgentB({ output }: { output: AgentBOutput[] }) {
  return (
    <Accordion type="multiple" className="space-y-3">
      {output.map((source, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="border-b-0"
        >
          <Card className="px-4 overflow-hidden bg-accent/5 hover:border-primary/50 transition-colors">
            <AccordionTrigger className="p-0 hover:no-underline">
              <div className="flex items-center gap-3 text-left">
                <span className="text-lg">📄</span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{source.title}</h4>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-blue-500 hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLinkIcon className="w-3 h-3" />
                    <span className="truncate max-w-[200px]">{source.url}</span>
                  </a>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4">
              <div className="space-y-4">
                {source.key_points.length > 0 && (
                  <div>
                    <h5 className="font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      Key Points
                    </h5>
                    <ul className="space-y-1">
                      {source.key_points.map((point, i) => (
                        <li key={i} className="text-foreground flex gap-2">
                          <span className="text-primary">→</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {source.claims.length > 0 && (
                  <div>
                    <h5 className="font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      Claims
                    </h5>
                    <ul className="space-y-1">
                      {source.claims.map((claim, i) => (
                        <li key={i} className="text-foreground flex gap-2">
                          <span className="text-primary">→</span>
                          {claim}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {source.data.length > 0 && (
                  <div>
                    <h5 className="font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      Data
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {source.data.map((item, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs rounded-md bg-muted text-foreground font-mono"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {source.bias_or_limitations && (
                  <Alert className="bg-warning/10 border border-warning/20 text-warning">
                    <AlertTriangleIcon className="w-4 h-4 shrink-0" />
                    <AlertTitle>Bias / Limitations</AlertTitle>
                    <AlertDescription>
                      {source.bias_or_limitations}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </AccordionContent>
          </Card>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
