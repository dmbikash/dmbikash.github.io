import { cn } from "@/lib/utils";

export function Chips({ items, className, label }: { items: string[]; className?: string; label?: string }) {
  if (!items.length) return null;
  return (
    <ul className={cn("flex flex-wrap gap-2", className)} aria-label={label}>
      {items.map((item) => (
        <li key={item} className="chip">
          {item}
        </li>
      ))}
    </ul>
  );
}
