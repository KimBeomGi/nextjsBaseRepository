"use server";

import { db } from "@/lib/db";
import { PostSchema, PostFormValues } from "@/schemas/post-schema";
import { revalidatePath } from "next/cache";

/**
 * [Server Actions] Post
 * 
 * - "use server" 지시어가 선언된 파일의 함수들은 서버에서만 실행됩니다.
 * - 클라이언트 컴포넌트에서 이 함수들을 비동기 함수처럼 직접 호출할 수 있습니다.
 * - Next.js가 내부적으로 API 엔드포인트를 생성하고 RPC(Remote Procedure Call)처럼 통신을 처리합니다.
 */

export type ActionState = {
  success?: boolean;
  message?: string;
  errors?: {
    [K in keyof PostFormValues]?: string[];
  };
};

// 1. 게시글 생성 (Create)
export async function createPost(prevState: ActionState, formData: FormData): Promise<ActionState> {
  // FormData를 일반 객체로 변환
  const rawData = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    published: formData.get("published") === "on", // checkbox 처리
  };

  // Zod 유효성 검사
  const validatedFields = PostSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "입력값이 올바르지 않습니다.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await db.post.create({
      data: validatedFields.data,
    });

    // 데이터가 변경되었으므로 해당 페이지의 캐시를 갱신
    revalidatePath("/posts");
    
    return { success: true, message: "게시글이 성공적으로 등록되었습니다." };
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false, message: "데이터베이스 오류가 발생했습니다." };
  }
}

// 2. 게시글 목록 조회 (Read)
export async function getPosts() {
  try {
    return await db.post.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

// 3. 게시글 삭제 (Delete)
export async function deletePost(id: number) {
  try {
    await db.post.delete({ where: { id } });
    revalidatePath("/posts");
    return { success: true, message: "삭제되었습니다." };
  } catch (error) {
    return { success: false, message: "삭제 실패" };
  }
}
