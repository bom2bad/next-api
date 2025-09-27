// src/app/(user)/post-client/page.tsx

"use client";
import { useCommentsStore } from "@/store/comments";
import { useEffect } from "react";

export default function PostsClientPage() {
  const { 
    posts, 
    comments, 
    loading, 
    error, 
    expandedPosts,
    fetchPosts, 
    toggleComments 
  } = useCommentsStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (loading) return <p className="text-center p-4">กำลังโหลด...</p>;
  if (error) return <p className="text-center p-4 text-red-500">ผิดพลาด: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Posts with Comments (Client)</h1>
      
      <div className="space-y-4">
        {posts.map((post) => {
          const postComments = comments[post.id] || [];
          const isExpanded = expandedPosts.has(post.id);
          
          return (
            <div key={post.id} className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-3">{post.body}</p>
              
              <button
                onClick={() => toggleComments(post.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                {isExpanded ? 'ซ่อน' : 'แสดง'} Comments ({isExpanded ? postComments.length : '?'})
              </button>

              {isExpanded && (
                <div className="mt-4 pl-4 border-l-2 border-gray-200">
                  {postComments.length === 0 ? (
                    <p className="text-gray-500">กำลังโหลด comments...</p>
                  ) : (
                    <div className="space-y-3">
                      {postComments.map((comment) => (
                        <div key={comment.id} className="bg-gray-50 p-3 rounded">
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-medium text-sm">{comment.name}</span>
                            <span className="text-xs text-gray-500">{comment.email}</span>
                          </div>
                          <p className="text-sm text-gray-700">{comment.body}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}