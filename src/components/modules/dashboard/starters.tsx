import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent, CardFooter } from "@/components/ui/shadcn/card";
import { ArrowUpIcon } from "lucide-react";

export default function Starters({
  onClick,
}: {
  onClick: (topic: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        "How to become a 3d animator?",
        "Remote work and its impact on productivity",
        "Best gaming laptop under ₹80,000",
        "What are the best books to read in 2026?",
      ].map((starter) => (
        <div
          role="button"
          tabIndex={0}
          key={starter}
          onClick={() => {
            onClick(starter);
          }}
          className="cursor-pointer text-left transition-colors"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onClick(starter);
            }
          }}
        >
          <Card className="p-3 *:p-0 hover:bg-card/80 h-full flex flex-col">
            <CardContent>{starter}</CardContent>
            <CardFooter className="mt-auto ml-auto">
              <Button size={"icon-xs"}>
                <ArrowUpIcon />
              </Button>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
}
