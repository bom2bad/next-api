import axios from "axios";
import { Post, Comment } from "@/types";
import { notFound } from "next/navigation";
import Link from "next/link";

type Props = {
  params: { id: string };
};

export default async function CommentsPage({ params }: Props) {
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
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <Link href="/posts">
                <span>⬅️</span> กลับไปรายการ Posts
              </Link>
              
            </div>
          </div>
        </nav>

        <div className="container">
          {/* Post Summary */}
          <div className="card" style={{ marginBottom: '30px' }}>
            <div className="card-header">
              <span className="badge">
                <span>📄</span> Post #{post.id}
              </span>
              <span className="badge badge-success">
                <span>💬</span> {comments.length} Comments
              </span>
            </div>
            
            <h1 className="card-title" style={{ fontSize: '28px', marginBottom: '15px' }}>
              {post.title}
            </h1>
            
            <div className="card-body">
              <p style={{ fontSize: '16px', opacity: '0.8' }}>
                {post.body.substring(0, 200)}...
              </p>
            </div>
          </div>

          {/* Comments Section */}
          <section className="comments-section">
            <div className="comments-header">
              <h2><span>💬</span> All Comments ({comments.length})</h2>
            </div>
            
            <div className="comments-body">
              {comments.length === 0 ? (
                <div className="no-comments">
                  <p>ยังไม่มีความคิดเห็น</p>
                  <p style={{ fontSize: '14px', marginTop: '10px', opacity: '0.8' }}>
                    เป็นคนแรกที่แสดงความคิดเห็น! <span>🎉</span>
                  </p>
                </div>
              ) : (
                <div>
                  {comments.map((comment, index) => (
                    <div 
                      key={comment.id} 
                      className="comment"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="comment-header">
                        <div className="comment-author">
                          <span>😊</span> {comment.name}
                        </div>
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