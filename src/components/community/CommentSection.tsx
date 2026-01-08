"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, CornerDownRight } from "lucide-react";
import { addComment } from "@/actions/comment-actions";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// 타입 정의 (Prisma include 결과와 맞춤)
type CommentWithChildren = {
  id: number;
  content: string;
  createdAt: Date;
  parentId: number | null;
  children: CommentWithChildren[];
};

interface CommentSectionProps {
  postId: number;
  comments: CommentWithChildren[];
}

export default function CommentSection({ postId, comments }: CommentSectionProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    const result = await addComment(postId, content);
    setIsSubmitting(false);

    if (result.success) {
      setContent("");
      toast.success("댓글이 등록되었습니다.");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="mt-12 pt-8 border-t">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <MessageSquare className="h-5 w-5" />
        Comments
      </h3>

      {/* Root Comment Form */}
      <form onSubmit={handleSubmit} className="mb-10 flex gap-4">
        <textarea
          className="flex-1 min-h-[80px] p-3 border rounded-lg bg-gray-50 dark:bg-zinc-900 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          placeholder="댓글을 남겨보세요..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button type="submit" disabled={isSubmitting} className="h-auto">
          등록
        </Button>
      </form>

      {/* Comment List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} postId={postId} />
        ))}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// Recursive Comment Item Component
// ------------------------------------------------------------------
function CommentItem({ comment, postId }: { comment: CommentWithChildren; postId: number }) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    setIsSubmitting(true);
    const result = await addComment(postId, replyContent, comment.id); // parentId 전달
    setIsSubmitting(false);

    if (result.success) {
      setReplyContent("");
      setIsReplying(false);
      toast.success("답글이 등록되었습니다.");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="group">
      <div className="flex gap-4">
        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-zinc-800 flex items-center justify-center text-gray-500 font-bold">
          U
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-sm">User</span>
            <span className="text-xs text-muted-foreground">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">{comment.content}</p>
          
          <button 
            onClick={() => setIsReplying(!isReplying)}
            className="text-xs text-blue-600 hover:underline font-medium"
          >
            답글 달기
          </button>

          {/* Reply Form */}
          {isReplying && (
            <form onSubmit={handleReplySubmit} className="mt-3 flex gap-2 animate-in fade-in slide-in-from-top-2">
              <CornerDownRight className="h-4 w-4 text-muted-foreground mt-2" />
              <div className="flex-1">
                 <textarea
                  className="w-full min-h-[60px] p-2 text-sm border rounded-md bg-gray-50 dark:bg-zinc-900 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  placeholder="답글을 입력하세요..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  autoFocus
                />
                <div className="flex justify-end gap-2 mt-2">
                  <Button type="button" variant="ghost" size="sm" onClick={() => setIsReplying(false)}>취소</Button>
                  <Button type="submit" size="sm" disabled={isSubmitting}>등록</Button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Nested Children (Recursive) */}
      {comment.children && comment.children.length > 0 && (
        <div className="pl-12 mt-4 space-y-4 border-l-2 border-gray-100 dark:border-zinc-800 ml-5">
          {comment.children.map((child) => (
            <CommentItem key={child.id} comment={child} postId={postId} />
          ))}
        </div>
      )}
    </div>
  );
}
