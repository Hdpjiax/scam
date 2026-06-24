"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ComponentProps, MouseEvent, startTransition } from "react";

type TransitionLinkProps = ComponentProps<typeof Link>;

function navigateWithTransition(
  router: ReturnType<typeof useRouter>,
  href: string,
) {
  if (typeof document !== "undefined" && "startViewTransition" in document) {
    (document as Document & { startViewTransition: (cb: () => void) => void })
      .startViewTransition(() => {
        startTransition(() => router.push(href));
      });
    return;
  }
  router.push(href);
}

export default function TransitionLink({
  href,
  onClick,
  children,
  ...props
}: TransitionLinkProps) {
  const router = useRouter();
  const path = typeof href === "string" ? href : href.pathname || "/";

  return (
    <Link
      href={href}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          props.target === "_blank"
        ) {
          return;
        }
        event.preventDefault();
        navigateWithTransition(router, path);
      }}
      {...props}
    >
      {children}
    </Link>
  );
}