import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Disable caching

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();
    const inputs = requestData.inputs || {};
    const webhookKey = process.env.KESTRA_WEBHOOK_KEY;
    const namespace = process.env.KESTRA_NAMESPACE;
    const flowId = process.env.KESTRA_FLOW_ID;

    const kestraUrl = process.env.NEXT_PUBLIC_KESTRA_URL;
    const url = `${kestraUrl}/api/v1/main/executions/webhook/${namespace}/${flowId}/${webhookKey}`;

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
      cache: "no-store",
    });

    return NextResponse.json({
      message: "Workflow triggered successfully",
      timestamp: new Date().toISOString(), // Add timestamp to prevent caching
    });
  } catch (error) {
    console.error("Error triggering workflow:", error);
    return NextResponse.json(
      {
        error: "Failed to trigger workflow",
        timestamp: new Date().toISOString(), // Add timestamp to prevent caching
      },
      { status: 500 }
    );
  }
}
