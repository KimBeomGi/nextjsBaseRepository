import { getPosts } from "@/actions/post-actions";
import PostForm from "@/components/forms/PostForm";
import DeleteButton from "@/components/forms/DeleteButton";
import Link from "next/link";

/**
 * [Server Component] Posts Page
 * 
 * - Prisma DB에 직접 접근하여 데이터를 가져옵니다. (Zero API Overhead)
 * - 클라이언트 컴포넌트(PostForm)를 포함하여 상호작용을 처리합니다.
 */

export const dynamic = "force-dynamic"; // DB 데이터가 실시간으로 변하므로 동적 렌더링 강제

export default async function PostsPage() {
  // Server Action 함수를 직접 호출하여 데이터 로딩 (Backend 로직 직접 실행)
  const posts = await getPosts();

  return (
    <div className="max-w-5xl mx-auto p-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          게시판 (Fullstack Demo)
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Server Actions와 Prisma DB를 연동한 실시간 데이터 처리 예제입니다.
        </p>
      </header>

      <div className="grid gap-12 md:grid-cols-[1fr_350px]">
        {/* 왼쪽: 게시글 목록 (Read) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Latest Posts</h2>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium dark:bg-zinc-800">
              Total: {posts.length}
            </span>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed rounded-xl dark:border-zinc-800">
              <p className="text-gray-500">아직 작성된 게시글이 없습니다.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {posts.map((post: Post) => (
                <li 
                  key={post.id}
                  className="p-6 border rounded-xl bg-white shadow-sm dark:bg-zinc-900 dark:border-zinc-800 transition-all hover:shadow-md"
                >
                  <div className="flex justify-between items-start mb-2">
                    <Link href={`/posts/${post.id}`} className="hover:underline decoration-blue-500 underline-offset-4">
                      <h3 className="text-xl font-bold">{post.title}</h3>
                    </Link>
                    <DeleteButton id={post.id} />
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 whitespace-pre-wrap">
                    {post.content || "내용 없음"}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>
                      {post.published ? (
                        <span className="text-green-600 font-medium">● 공개됨</span>
                      ) : (
                        <span className="text-gray-400">○ 비공개</span>
                      )}
                    </span>
                    <time suppressHydrationWarning>
                      {new Date(post.createdAt).toLocaleDateString()} {new Date(post.createdAt).toLocaleTimeString()}
                    </time>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* 오른쪽: 글쓰기 폼 (Create) */}
        <aside className="h-fit sticky top-8">
          <PostForm />
          
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-blue-800 dark:text-blue-200">
            <h4 className="font-bold mb-1">💡 개발 팁</h4>
            <p>
              이 폼을 제출하면 <strong>Server Action</strong>이 실행되어 DB에 데이터가 저장되고, 
              <code>revalidatePath</code>가 호출되어 왼쪽 목록이 즉시 갱신됩니다.
              별도의 API 호출이나 <code>useEffect</code>가 필요 없습니다.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}