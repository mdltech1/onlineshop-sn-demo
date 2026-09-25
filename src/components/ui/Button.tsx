import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "dark" | "accent" | "outline" | "light" | "ghostLight";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-medium tracking-[-0.01em] transition-[background-color,color,border-color,transform] duration-300 ease-out-soft active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40";

const variants: Record<Variant, string> = {
  dark: "bg-ink text-ivory hover:bg-charcoal",
  accent: "bg-accent text-ivory hover:bg-accent-deep",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-ivory",
  light: "bg-ivory text-ink hover:bg-paper",
  ghostLight: "border border-ivory/45 text-ivory hover:border-ivory hover:bg-ivory hover:text-ink",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[15px]",
};

type Common = { variant?: Variant; size?: Size; className?: string; children: ReactNode };

export function buttonClasses({ variant = "dark", size = "md", className = "" }: Omit<Common, "children">) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

export function ButtonLink({
  variant,
  size,
  className,
  children,
  external,
  ...rest
}: Common & ComponentProps<typeof Link> & { external?: boolean }) {
  const cls = buttonClasses({ variant, size, className });
  if (external) {
    return (
      <a className={cls} target="_blank" rel="noopener noreferrer" href={String(rest.href)} aria-label={rest["aria-label"]}>
        {children}
      </a>
    );
  }
  return (
    <Link className={cls} {...rest}>
      {children}
    </Link>
  );
}

export function Button({ variant, size, className, children, ...rest }: Common & ComponentProps<"button">) {
  return (
    <button type="button" className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
    </button>
  );
}
