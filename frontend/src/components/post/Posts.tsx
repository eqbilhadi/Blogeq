"use client";
import React, { useState } from "react";
import PostCard from "./PostCard";

export default function Posts({ data }: { data: ApiResponseType<PostType> }) {
  const [posts, setPosts] = useState<ApiResponseType<PostType>>(data);
  return (
    <div className="pt-4 p-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {posts.data &&
        posts.data.length > 0 &&
        posts.data.map((item, index) => <PostCard post={item} key={index} />)}
    </div>
  );
}
