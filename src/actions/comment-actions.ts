"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addComment(postId: number, content: string, parentId?: number | null) {
  if (!content.trim()) {
    return { success: false, message: "내용을 입력해주세요." };
  }

  try {
    await db.comment.create({
      data: {
        content,
        postId,
        parentId, // 대댓글인 경우 부모 ID, 아니면 null
      },
    });

    revalidatePath(`/posts/${postId}`); // 해당 게시글 페이지 갱신
    return { success: true };
  } catch (error) {
    console.error("Comment Error:", error);
    return { success: false, message: "댓글 저장 실패" };
  }
}
