import { Card } from "@/components/ui/shadcn/card";
import { Separator } from "@/components/ui/shadcn/separator";
import {
  AlertTriangleIcon,
  BookOpenIcon,
  CheckCircle2Icon,
  ExternalLinkIcon,
  LightbulbIcon,
} from "lucide-react";
import type { AgentDOutput } from "../types";

export default function AgentD({ output }: { output: AgentDOutput }) {
  return (
    <div className="space-y-6">
      <Card className="p-5 bg-linear-to-br from-primary/10 to-transparent border-primary/20">
        <div className="flex items-center gap-2 mb-3">
          <BookOpenIcon className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Overview</h3>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          {output.overview}
        </p>
      </Card>

      <div className="space-y-4">
        {output.sections.map((section, i) => (
          <div
            key={i}
            className="p-4 rounded-lg bg-accent/5 border border-border animate-fade-in"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <h4 className="font-semibold text-foreground mb-2">
              {section.title}
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {section.content}
            </p>
          </div>
        ))}
      </div>

      <Separator className="bg-border" />

      <div className="grid gap-4 md:grid-cols-2">
        {output.contradictions.length > 0 && (
          <Card className="p-4 bg-destructive/5 border-destructive/20">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangleIcon className="w-4 h-4 text-destructive" />
              <h4 className="font-semibold text-foreground">Contradictions</h4>
            </div>
            <ul className="space-y-2">
              {output.contradictions.map((item, i) => (
                <li key={i} className="text-muted-foreground flex gap-2">
                  <span className="text-destructive">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        )}

        {output.implications.length > 0 && (
          <Card className="p-4 bg-primary/5 border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <LightbulbIcon className="w-4 h-4 text-primary" />
              <h4 className="font-semibold text-foreground">Implications</h4>
            </div>
            <ul className="space-y-2">
              {output.implications.map((item, i) => (
                <li key={i} className="text-muted-foreground flex gap-2">
                  <span className="text-primary">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>

      <Card className="p-5 bg-linear-to-br from-success/10 to-transparent border-success/20">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle2Icon className="w-5 h-5 text-success" />
          <h3 className="font-semibold text-foreground">Conclusion</h3>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          {output.conclusion}
        </p>
      </Card>

      {output.sources.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Sources
          </h4>
          <div className="flex flex-wrap gap-2">
            {output.sources.map((source, i) => (
              <a
                key={i}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-sm text-foreground hover:bg-primary/20 hover:text-primary transition-colors"
              >
                <ExternalLinkIcon className="w-3 h-3" />
                {source.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
