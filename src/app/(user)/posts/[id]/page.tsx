// src/app/(user)/posts/[id]/page.tsx

import axios from "axios";
import { Post, Comment } from "@/types";
import { notFound } from "next/navigation";
import Link from "next/link";

type Props = {
  params: { id: string };
};

export default async function PostDetailPage({ params }: Props) {
  const postId = parseInt(params.id);
  
  if (isNaN(postId)) {
    notFound();
  }

  try {
    const [postRes, commentsRes] = await Promise.all([
      axios.get<Post>(`https://jsonplaceholder.typicode.com/posts/${postId}`),
      axios.get<Comment[]>(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    ]);

    const post = postRes.data;
    const comments = commentsRes.data;

    return (
      <div>
        {/* Navigation */}
        <nav className="nav">
          <div className="container">
            <Link href="/posts">
              ← กลับไปหน้ารายการ Posts
            </Link>
          </div>
        </nav>

        <div className="container">
          {/* Post Content */}
          <article className="card">
            <div className="card-header">
              <span className="badge">Post #{post.id}</span>
              <span className="badge badge-secondary">โดย User {post.userId}</span>
            </div>
            
            <h1 className="card-title" style={{ fontSize: '28px', marginBottom: '20px' }}>
              {post.title}
            </h1>
            
            <div className="card-body">
              <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
                {post.body}
              </p>
            </div>
          </article>

          {/* Comments Section */}
          <section className="comments-section">
            <div className="comments-header">
              <h2>💬 Comments ({comments.length})</h2>
            </div>
            
            <div className="comments-body">
              {comments.length === 0 ? (
                <div className="no-comments">
                  <p>ยังไม่มีความคิดเห็น</p>
                  <p style={{ fontSize: '14px', marginTop: '10px' }}>
                    เป็นคนแรกที่แสดงความคิดเห็น!
                  </p>
                </div>
              ) : (
                <div>
                  {comments.map((comment) => (
                    <div key={comment.id} className="comment">
                      <div className="comment-header">
                        <div className="comment-author">{comment.name}</div>
                        <div className="comment-email">{comment.email}</div>
                      </div>
                      <div className="comment-body">
                        {comment.body}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}