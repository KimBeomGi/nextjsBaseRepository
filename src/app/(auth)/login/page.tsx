import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">환영합니다!</h1>
        <p className="text-sm text-gray-500">이메일을 입력하여 로그인하세요.</p>
      </div>

      <form className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="email">이메일</label>
          <input 
            id="email"
            type="email" 
            placeholder="name@example.com"
            className="w-full px-3 py-2 border rounded-md bg-transparent dark:border-zinc-800 focus:ring-2 focus:ring-primary outline-none transition-all"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium" htmlFor="password">비밀번호</label>
            <a href="#" className="text-xs text-blue-600 hover:underline">비밀번호 찾기</a>
          </div>
          <input 
            id="password"
            type="password" 
            className="w-full px-3 py-2 border rounded-md bg-transparent dark:border-zinc-800 focus:ring-2 focus:ring-primary outline-none transition-all"
          />
        </div>
        <Button className="w-full" size="lg">로그인</Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-zinc-900 px-2 text-gray-500">Or continue with</span>
        </div>
      </div>

      <Button variant="outline" className="w-full">
        Google로 시작하기
      </Button>

      <p className="text-center text-sm text-gray-500">
        계정이 없으신가요?{" "}
        <a href="#" className="text-blue-600 hover:underline">회원가입</a>
      </p>
    </div>
  );
}
