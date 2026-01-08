import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import CommentSection from "@/components/community/CommentSection";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostDetailPage({ params }: PostPageProps) {
  const { id } = await params;
  const postId = parseInt(id);

  if (isNaN(postId)) return notFound();

  // 1. 게시글 가져오기
  const post = await db.post.findUnique({
    where: { id: postId },
  });

  if (!post) return notFound();

  // 2. 해당 게시글의 모든 댓글 가져오기 (날짜순)
  const allComments = await db.comment.findMany({
    where: { postId },
    orderBy: { createdAt: "asc" },
  });

  // 3. Flat List -> Tree Structure 변환
  // (대댓글 기능을 위해 부모-자식 관계 연결)
  const commentTree = buildCommentTree(allComments);

  return (
    <div className="container max-w-4xl py-12">
      <Button variant="ghost" asChild className="mb-8 pl-0 hover:pl-2 transition-all">
        <Link href="/posts">
          <ArrowLeft className="mr-2 h-4 w-4" /> 목록으로 돌아가기
        </Link>
      </Button>

      <article className="mb-16">
        <header className="mb-8">
          <div className="flex gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-bold">
              Community
            </span>
            {post.published ? (
               <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-bold">Public</span>
            ) : (
               <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-full text-xs font-bold">Draft</span>
            )}
          </div>
          <h1 className="text-4xl font-black tracking-tight mb-4">{post.title}</h1>
          <div className="text-sm text-muted-foreground flex justify-between border-b pb-4">
            <span>By User</span>
            <time>{new Date(post.createdAt).toLocaleDateString()}</time>
          </div>
        </header>

        <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed whitespace-pre-wrap">
          {post.content || "내용이 없습니다."}
        </div>
      </article>

      {/* 댓글 섹션 (Tree 구조 데이터 전달) */}
      <CommentSection postId={postId} comments={commentTree} />
    </div>
  );
}

// Helper: Flat Comments -> Tree
function buildCommentTree(comments: any[]) {
  const map = new Map();
  const roots: any[] = [];

  // 1. 모든 댓글을 Map에 등록 및 children 배열 초기화
  comments.forEach((c) => {
    map.set(c.id, { ...c, children: [] });
  });

  // 2. 부모가 있으면 부모의 children에 추가, 없으면 root에 추가
  comments.forEach((c) => {
    if (c.parentId && map.has(c.parentId)) {
      map.get(c.parentId).children.push(map.get(c.id));
    } else {
      roots.push(map.get(c.id));
    }
  });

  return roots;
}
