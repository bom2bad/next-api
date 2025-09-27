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

  if (loading) {
    return <div className="loading">กำลังโหลดข้อมูล...</div>;
  }

  if (error) {
    return <div className="error">เกิดข้อผิดพลาด: {error}</div>;
  }

  return (
    <div>
      <header className="header">
        <div className="container">
          <h1>📱 Interactive Posts</h1>
          <p>กดเพื่อดู Comments แต่ละ Post</p>
        </div>
      </header>

      <div className="container">
        {posts.map((post) => {
          const postComments = comments[post.id] || [];
          const isExpanded = expandedPosts.has(post.id);
          
          return (
            <div key={post.id} className="card">
              <div className="card-header">
                <span className="badge">Post #{post.id}</span>
                <span className="badge badge-secondary">User {post.userId}</span>
              </div>
              
              <h2 className="card-title">{post.title}</h2>
              
              <div className="card-body">
                <p>{post.body}</p>
              </div>
              
              <div style={{ marginTop: '15px' }}>
                <button
                  onClick={() => toggleComments(post.id)}
                  className="toggle-btn"
                >
                  {isExpanded ? '🔼 ซ่อน' : '🔽 แสดง'} Comments 
                  {isExpanded && ` (${postComments.length})`}
                </button>
              </div>

              {isExpanded && (
                <div className="expandable-section">
                  {postComments.length === 0 ? (
                    <p style={{ color: '#666', fontStyle: 'italic' }}>
                      กำลังโหลด comments...
                    </p>
                  ) : (
                    <div>
                      {postComments.map((comment) => (
                        <div key={comment.id} className="client-comment">
                          <div className="client-comment-header">
                            <span className="client-comment-name">{comment.name}</span>
                            <span className="client-comment-email">{comment.email}</span>
                          </div>
                          <div className="client-comment-body">
                            {comment.body}
                          </div>
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