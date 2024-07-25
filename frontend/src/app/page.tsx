import { Button } from "@/components/ui/button";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";

export default async function App() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      Hey I am App File
      <Button>Click Me</Button>
      <p>{JSON.stringify(session)}</p>
    </div>
  );
}
