import { Spark } from "@/components/brand/Spark";

// Illustration of what the visitor gets: the 1-page plan.
// It shows the structure of the plan, not real client data.

type PlanCardProps = {
  title: string;
  rows: string[];
  footer: string;
};

export function PlanCard({ title, rows, footer }: PlanCardProps) {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[440px]">
      <div className="absolute -inset-4 -z-10 rounded-[40%_60%_55%_45%/50%_45%_55%_50%] bg-brand-soft sm:-inset-8" />

      <div className="rotate-[-2deg] rounded-card bg-white p-6 shadow-card sm:p-8">
        <p className="font-display text-xl font-semibold">{title}</p>
        <div className="mt-1 h-1 w-14 rounded-full bg-brand" />

        <ul className="mt-6 space-y-5">
          {rows.map((row, index) => (
            <li key={row} className="flex gap-4">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-soft font-display text-sm font-bold text-brand">
                {index + 1}
              </span>
              <div className="flex-1">
                <p className="font-medium">{row}</p>
                <div className="mt-2 h-2 w-full rounded-full bg-line" />
                <div className="mt-1.5 h-2 w-3/4 rounded-full bg-line" />
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-6 border-t border-line pt-4 text-sm font-medium text-brand">{footer}</p>
      </div>

      <Spark className="absolute -top-10 -end-6 size-16 rtl:-scale-x-100" />
    </div>
  );
}
