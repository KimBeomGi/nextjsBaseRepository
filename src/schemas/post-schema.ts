import { z } from "zod";

/**
 * [Zod Schema] Post
 * 
 * - 프론트엔드(폼 유효성 검사)와 백엔드(API 요청 검증)에서 공통으로 사용합니다.
 * - 데이터의 형태와 제약 조건을 정의합니다.
 */

export const PostSchema = z.object({
  title: z
    .string()
    .min(1, { message: "제목을 입력해주세요." })
    .max(100, { message: "제목은 100자를 넘을 수 없습니다." }),
  content: z
    .string()
    .max(5000, { message: "내용은 5000자를 넘을 수 없습니다." })
    .optional(),
  published: z.boolean().default(false),
});

// 타입 추론을 위한 Type Export
export type PostFormValues = z.infer<typeof PostSchema>;
