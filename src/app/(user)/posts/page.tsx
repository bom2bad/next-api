// src/app/(user)/post/page.tsx

import axios from "axios";
import Link from "next/link";
import { Post } from "@/types";

export default async function PostsPage() {
  const res = await axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts");
  const posts = res.data;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <div className="grid gap-4">
        {posts.slice(0, 10).map((post) => (
          <div key={post.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-3">{post.body.substring(0, 100)}...</p>
            <Link 
              href={`/posts/${post.id}`}
              className="text-blue-500 hover:underline"
            >
              ดู Comments ({post.id} comments)
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
