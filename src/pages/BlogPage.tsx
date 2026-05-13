import React from 'react';
import { motion } from 'motion/react';
import { BlogPost, Role } from '../types';
import BlogSection from '../components/BlogSection';

interface BlogPageProps {
  posts: BlogPost[];
  role: Role;
  onAddPost: (post: Partial<BlogPost>) => void;
  onDeletePost: (postId: string) => void;
  onLikePost: (postId: string) => void;
  onReportPost: (postId: string) => void;
}

export default function BlogPage({
  posts,
  role,
  onAddPost,
  onDeletePost,
  onLikePost,
  onReportPost
}: BlogPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32"
    >
      <BlogSection
        posts={posts}
        role={role}
        onAddPost={onAddPost}
        onDeletePost={onDeletePost}
        onLikePost={onLikePost}
        onReportPost={onReportPost}
      />
    </motion.div>
  );
}
