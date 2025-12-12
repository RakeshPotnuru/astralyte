"use client";

export default function Dashboard() {
  const triggerKestraFlow = async () => {
    try {
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/trigger-kestra-flow?_=${timestamp}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: {
            topic: "best gaming monitor under 50000 INR",
          },
        }),
        cache: "no-store",
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => triggerKestraFlow()}>Trigger Kestra Flow</button>
    </div>
  );
}
