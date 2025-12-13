import { Card } from "@/components/ui/shadcn/card";
import type { AgentCOutput } from "../types";
import { AlertCircleIcon, SparklesIcon, LightbulbIcon } from "lucide-react";

export default function AgentC({ output }: { output: AgentCOutput }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="p-4 bg-accent/5">
        <div className="flex items-center gap-2 mb-3">
          <LightbulbIcon className="w-4 h-4 text-primary" />
          <h4 className="font-semibold text-foreground">Major Themes</h4>
        </div>
        <ul className="space-y-2">
          {output.major_themes.map((theme, i) => (
            <li key={i} className="text-muted-foreground flex gap-2">
              <span className="text-primary">•</span>
              {theme}
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-4 bg-accent/5 border border-destructive/20">
        <div className="flex items-center gap-2 mb-3">
          <AlertCircleIcon className="w-4 h-4 text-destructive" />
          <h4 className="font-semibold text-foreground">Contradictions</h4>
        </div>
        <ul className="space-y-2">
          {output.contradictions.map((item, i) => (
            <li key={i} className="text-muted-foreground flex gap-2">
              <span className="text-destructive">⚡</span>
              {item}
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-4 bg-accent/5 border border-secondary/20">
        <div className="flex items-center gap-2 mb-3">
          <SparklesIcon className="w-4 h-4 text-secondary" />
          <h4 className="font-semibold text-foreground">Emerging Insights</h4>
        </div>
        <ul className="space-y-2">
          {output.emerging_insights.map((insight, i) => (
            <li key={i} className="text-muted-foreground flex gap-2">
              <span className="text-secondary">✦</span>
              {insight}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
