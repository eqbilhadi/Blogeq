import React from "react";
import { getServerSession } from "next-auth";
import {
  authOptions,
  CustomSession,
} from "../api/auth/[...nextauth]/authOptions";
import { fetchPosts } from "@/dateFetch/postFetch";
import Posts from "@/components/post/Posts";

export default async function App() {
  const session: CustomSession | null = await getServerSession(authOptions);
  const posts: ApiResponseType<PostType> = await fetchPosts(
    session?.user?.token!
  );

  return (
    <div>
      <Posts data={posts} />
    </div>
  );
}
