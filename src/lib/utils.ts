import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * [Utility] cn (Class Name)
 * 
 * - Tailwind CSS 클래스 충돌을 해결하고 조건부로 클래스를 결합합니다.
 * - 예: cn("bg-red-500", condition && "text-white", "p-4")
 * - tailwind-merge가 중복된 클래스(px-2 px-4 등) 중 마지막 것을 우선 적용해줍니다.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
