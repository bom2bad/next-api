// src/store/comments.ts

"use client";
import { create } from "zustand";
import axios from "axios";
import { Post, Comment } from "@/types";

type CommentsState = {
  posts: Post[];
  comments: { [postId: number]: Comment[] };
  loading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  fetchComments: (postId: number) => Promise<void>;
  toggleComments: (postId: number) => void;
  expandedPosts: Set<number>;
};

export const useCommentsStore = create<CommentsState>((set, get) => ({
  posts: [],
  comments: {},
  loading: false,
  error: null,
  expandedPosts: new Set(),

  fetchPosts: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get<Post[]>(
        "https://jsonplaceholder.typicode.com/posts"
      );
      set({ posts: data.slice(0, 10), loading: false });
    } catch (error) {
      set({ error: "Failed to fetch posts", loading: false });
    }
  },

  fetchComments: async (postId: number) => {
    const { comments } = get();
    if (comments[postId]) return; // Already fetched

    try {
      const { data } = await axios.get<Comment[]>(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      );
      set((state) => ({
        comments: { ...state.comments, [postId]: data }
      }));
    } catch (error) {
      console.error(`Failed to fetch comments for post ${postId}:`, error);
    }
  },

  toggleComments: (postId: number) => {
    const { expandedPosts, fetchComments } = get();
    const newExpanded = new Set(expandedPosts);
    
    if (newExpanded.has(postId)) {
      newExpanded.delete(postId);
    } else {
      newExpanded.add(postId);
      fetchComments(postId); // Fetch comments when expanding
    }
    
    set({ expandedPosts: newExpanded });
  }
}));
