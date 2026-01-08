"use client";

import { deletePost } from "@/actions/post-actions";
import { useTransition } from "react";

export default function DeleteButton({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      startTransition(async () => {
        await deletePost(id);
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="text-sm text-red-500 hover:text-red-700 disabled:opacity-50"
    >
      {isPending ? "삭제 중..." : "삭제"}
    </button>
  );
}
