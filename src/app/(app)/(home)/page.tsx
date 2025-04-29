"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const trcp = useTRPC();
  const { data } = useQuery(trcp.auth.session.queryOptions());

  return (
    <div>
      <h1>Home</h1>
      <p>{JSON.stringify(data?.user, null, 2)}</p>
    </div>
  );
}
