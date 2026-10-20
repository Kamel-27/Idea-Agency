// Centers content and keeps the same side padding on every section.

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  /** Force a text direction, e.g. "ltr" to keep a layout unflipped on Arabic pages. */
  dir?: "ltr" | "rtl";
};

export function Container({ children, className = "", dir }: ContainerProps) {
  return (
    <div dir={dir} className={`mx-auto w-full max-w-[1200px] px-6 ${className}`}>
      {children}
    </div>
  );
}
