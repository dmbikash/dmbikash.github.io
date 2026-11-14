import Link from "next/link";

import { Icon } from "@/components/ui/Icon";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center pt-24">
      <div className="container-page text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-[-0.04em] text-fg sm:text-7xl">Page not found</h1>
        <p className="mx-auto mt-5 max-w-md text-muted">The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.</p>
        <Link href="/" className="btn btn-primary mt-8">
          <Icon name="arrowLeft" size={18} />
          Back home
        </Link>
      </div>
    </section>
  );
}
