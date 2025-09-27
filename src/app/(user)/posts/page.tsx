// src/app/(user)/post/page.tsx

import axios from "axios";
import Link from "next/link";
import { Post } from "@/types";

export default async function PostsPage() {
  const res = await axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts");
  const posts = res.data;

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="container">
          <h1><span>📝</span> Blog Posts</h1>
          
        </div>
      </header>

      {/* Main Content */}
      <div className="container">
        <div className="posts-grid">
          {posts.slice(0, 12).map((post) => (
            <article key={post.id} className="card">
              <div className="card-header">
                <span className="badge">
                  📄 Post #{post.id}
                </span>
                <span className="badge badge-secondary">
                  👤 User {post.userId}
                </span>
              </div>
              
              <h2 className="card-title">{post.title}</h2>
              
              <div className="card-body">
                <p>{post.body.substring(0, 150)}...</p>
              </div>

              <div style={{ marginTop: '20px' }}>
                <Link href={`/posts/${post.id}/comments`} className="btn btn-primary">
                  Comments
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
