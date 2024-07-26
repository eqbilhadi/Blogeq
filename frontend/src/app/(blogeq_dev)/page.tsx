import { Button } from "@/components/ui/button";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import Navbar from "@/components/base/Navbar";

export default async function App() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1>I am homepage</h1>
    </div>
  );
}
