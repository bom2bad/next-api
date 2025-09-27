// src/app/(user)/posts/[id]/page.tsx

import axios from "axios";
import { Post, Comment } from "@/types";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export default async function PostDetailPage({ params }: Props) {
  const postId = parseInt(params.id);
  
  if (isNaN(postId)) {
    notFound();
  }

  try {
    // Fetch post and comments simultaneously
    const [postRes, commentsRes] = await Promise.all([
      axios.get<Post>(`https://jsonplaceholder.typicode.com/posts/${postId}`),
      axios.get<Comment[]>(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    ]);

    const post = postRes.data;
    const comments = commentsRes.data;

    return (
      <div className="container mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-700 leading-relaxed">{post.body}</p>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-2xl font-semibold mb-4">
            Comments ({comments.length})
          </h2>
          
          {comments.length === 0 ? (
            <p className="text-gray-500">ไม่มี comments</p>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{comment.name}</h3>
                    <span className="text-sm text-gray-500">{comment.email}</span>
                  </div>
                  <p className="text-gray-700">{comment.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}