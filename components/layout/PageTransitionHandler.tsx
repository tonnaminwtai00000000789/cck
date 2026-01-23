"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export function PageTransitionHandler() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.ctrlKey || e.metaKey) return;

      const a = (e.target as Element)?.closest('a[href^="/"]');
      if (
        !a ||
        (a as HTMLAnchorElement).target === "_blank" ||
        (a as HTMLAnchorElement).hasAttribute("download") ||
        (a as HTMLAnchorElement).getAttribute("href")?.startsWith("mailto:") ||
        (a as HTMLAnchorElement).getAttribute("href")?.startsWith("tel:")
      ) {
        return;
      }
      const href = (a as HTMLAnchorElement).getAttribute("href");
      if (!href || href === pathname) return;

      e.preventDefault();

      if (typeof document !== "undefined" && "startViewTransition" in document) {
        const vt = (document as Document & {
          startViewTransition: (cb: () => Promise<void>) => { finished: Promise<void> };
        }).startViewTransition(() => {
          window.scrollTo(0, 0);
          return router.push(href);
        });
      } else {
        window.scrollTo(0, 0);
        router.push(href);
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [router, pathname]);

  return null;
}
