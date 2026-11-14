import type { CSSProperties, ElementType, ReactNode } from "react";

/**
 * Marks content for a subtle scroll-in. The actual observing is done once, globally,
 * by <ClientEffects />, so this stays a zero-JS server component.
 */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  className,
  children,
  ...rest
}: {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: ReactNode;
} & Record<string, unknown>) {
  return (
    <Tag
      data-reveal=""
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
