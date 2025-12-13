"use client";

import { Button } from "@/components/ui/shadcn/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/shadcn/empty";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/shadcn/sheet";
import { Spinner } from "@/components/ui/shadcn/spinner";
import { Tables } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";
import { HistoryIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function History() {
  const [data, setData] = useState<Tables<"topics">[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const client = createClient();
      const { data, error } = await client.from("topics").select("*");
      if (!error) {
        setData(data);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      const client = createClient();
      const { error } = await client.from("topics").delete().eq("id", id);
      if (!error) {
        setData((prev) => prev.filter((item) => item.id !== id));
      }
      toast.success("Topic deleted successfully.");
    } catch {
      toast.error("Failed to delete topic. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"}>
          <HistoryIcon />
          History
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>History</SheetTitle>
        </SheetHeader>
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Spinner />
          </div>
        ) : !data.length ? (
          <Empty>
            <EmptyHeader>
              <EmptyTitle>No History</EmptyTitle>
              <EmptyDescription>
                You haven&apos;t created any topics yet.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="space-y-4 px-4">
            {data.map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <Button variant={"secondary"} asChild>
                  <Link href={`/${item.id}`}>{item.topic}</Link>
                </Button>
                <Button
                  variant={"destructive"}
                  onClick={() => handleDelete(item.id)}
                  disabled={isDeleting}
                >
                  {isDeleting ? <Spinner /> : <Trash2Icon />}
                </Button>
              </div>
            ))}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
