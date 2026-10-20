// Small pink label above a heading, e.g. "WHAT WE DO".

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-medium tracking-[4px] text-brand uppercase">{children}</p>
  );
}
