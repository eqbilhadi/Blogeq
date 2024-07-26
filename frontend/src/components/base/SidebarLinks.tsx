"use client";
import Link from "next/link";
import React from "react";
import UserAvatar from "../common/UserAvatar";
import { ArrowBigUp, Flame, Search, Link as LinkIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { CustomUser } from "@/app/api/auth/[...nextauth]/authOptions";
export default function SidebarLinks() {
  const { data } = useSession();
  const user = data?.user as CustomUser;
  return (
    <div>
      <Link href="/" className="flex space-x-4 items-center py-4">
        <UserAvatar image={user?.profile_image ?? undefined} />
        <p>Feed</p>
      </Link>
      <p className="my-2 font-bold text-muted-foreground">Discover</p>
      <ul>
        <li>
          <Link href="/popular" className="flex space-x-3 items-center mb-4">
            <Flame className="w-5 h-5" />
            <p>Popular</p>
          </Link>
        </li>
        <li>
          <Link href="/search" className="flex space-x-3 items-center mb-4">
            <Search className="w-5 h-5" />
            <p>Search</p>
          </Link>
        </li>
        <li>
          <Link href="/most-voted" className="flex space-x-3 items-center mb-4">
            <ArrowBigUp className="w-5 h-5" />
            <p>Most Voted</p>
          </Link>
        </li>
      </ul>
      <p className="my-2 font-bold text-muted-foreground">Contribute</p>
      <ul>
        <li>
          <Link href="/popular" className="flex space-x-3 items-center mb-4">
            <LinkIcon className="w-5 h-5" />
            <p>Submit Article</p>
          </Link>
        </li>
      </ul>
    </div>
  );
}
