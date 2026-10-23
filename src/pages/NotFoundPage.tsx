import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <section className="mx-auto flex min-h-[60svh] max-w-[1280px] flex-col justify-center px-[32px] py-24 max-md:px-[18px]">
      <h1 className="text-[40px] leading-[1.1] font-bold tracking-[-0.02em]">Page not found</h1>
      <p className="mt-6 text-[18px]">
        <Link to="/" className="underline underline-offset-4 hover:text-accent">
          Back to the start
        </Link>
      </p>
    </section>
  );
}
