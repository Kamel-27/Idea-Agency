// Small label above a heading, e.g. "WHAT WE DO", with an amber dash.
// It takes the text color of its section, so it works on paper and on navy.

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-3 text-sm font-semibold tracking-[4px] uppercase rtl:tracking-normal">
      <span aria-hidden="true" className="h-[3px] w-7 rounded-full bg-brand" />
      {children}
    </p>
  );
}
