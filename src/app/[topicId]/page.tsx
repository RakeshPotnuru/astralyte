import Topic from "@/components/modules/dashboard/topic";
import { Button } from "@/components/ui/shadcn/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/shadcn/empty";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function page({
  params,
}: {
  params: { topicId: string };
}) {
  const { topicId } = await params;

  const client = await createClient();

  const { data } = await client
    .from("topics")
    .select()
    .eq("id", topicId)
    .single();

  return (
    <div>
      {!data ? (
        <Empty>
          <EmptyHeader>
            <EmptyTitle>404 - Not Found</EmptyTitle>
            <EmptyDescription>
              The page you&apos;re looking for doesn&apos;t exist.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button size="sm" asChild>
              <Link href={"/"}>Go Home</Link>
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <Topic serverTopic={data} />
      )}
    </div>
  );
}
