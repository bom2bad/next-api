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
          <h1><span>📱</span> Interactive Posts</h1>
          
        </div>
      </header>

      <div className="container">
        {posts.map((post, index) => {
          const postComments = comments[post.id] || [];
          const isExpanded = expandedPosts.has(post.id);
          
          return (
            <div 
              key={post.id} 
              className="card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="card-header">
                <span className="badge">
                  <span></span> Post #{post.id}
                </span>
                <span className="badge badge-secondary">
                  <span>👤</span> User {post.userId}
                </span>
              </div>
              
              <h2 className="card-title">{post.title}</h2>
              
              <div className="card-body">
                <p>{post.body}</p>
              </div>
              
              <div style={{ marginTop: '20px' }}>
                <button
                  onClick={() => toggleComments(post.id)}
                  className="toggle-btn"
                >
                  {isExpanded ? 
                    <><span>🔼</span> ซ่อน Comments</> : 
                    <><span>🔽</span> แสดง Comments</>
                  }
                  {isExpanded && ` (${postComments.length})`}
                </button>
              </div>

              {isExpanded && (
                <div className="expandable-section">
                  {postComments.length === 0 ? (
                    <p style={{ color: '#7f8c8d', fontStyle: 'italic', textAlign: 'center' }}>
                      <span>⏳</span> กำลังโหลด comments...
                    </p>
                  ) : (
                    <div>
                      {postComments.map((comment, commentIndex) => (
                        <div 
                          key={comment.id} 
                          className="client-comment"
                          style={{ animationDelay: `${commentIndex * 0.1}s` }}
                        >
                          <div className="client-comment-header">
                            <span className="client-comment-name">
                              <span>😊</span> {comment.name}
                            </span>
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