// Small, accessible form controls with one consistent look.
// Each control shows its label, and an error message under it when invalid.
// aria-invalid and aria-describedby let screen readers announce the error.

type BaseProps = {
  id: string;
  label: string;
  error?: string;
};

const inputClass =
  "mt-2 block w-full rounded-xl border bg-white px-4 py-3 text-base text-ink outline-none transition placeholder:text-muted/60 focus:border-ink focus:ring-3 focus:ring-brand-soft";

function borderClass(error?: string) {
  return error ? "border-red-500" : "border-line";
}

function ErrorText({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600">
      {error}
    </p>
  );
}

function errorProps(id: string, error?: string) {
  return {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
  };
}

/* Text input ------------------------------------------------------------ */

type TextFieldProps = BaseProps & {
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "tel" | "email";
  placeholder?: string;
  autoComplete?: string;
  dir?: "ltr" | "rtl";
};

export function TextField({ id, label, error, value, onChange, type = "text", placeholder, autoComplete, dir }: TextFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="font-medium">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        dir={dir}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        className={`${inputClass} ${borderClass(error)}`}
        {...errorProps(id, error)}
      />
      <ErrorText id={id} error={error} />
    </div>
  );
}

/* Multi-line text --------------------------------------------------------- */

type TextAreaFieldProps = BaseProps & {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function TextAreaField({ id, label, error, value, onChange, placeholder }: TextAreaFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="font-medium">
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        rows={3}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={`${inputClass} ${borderClass(error)} resize-y`}
        {...errorProps(id, error)}
      />
      <ErrorText id={id} error={error} />
    </div>
  );
}

/* Dropdown (for long lists) ------------------------------------------------ */

type SelectFieldProps = BaseProps & {
  value: string;
  onChange: (value: string) => void;
  options: Record<string, string>;
  placeholder: string;
};

export function SelectField({ id, label, error, value, onChange, options, placeholder }: SelectFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="font-medium">
        {label}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`${inputClass} ${borderClass(error)} ${value ? "" : "text-muted/60"}`}
        {...errorProps(id, error)}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {Object.entries(options).map(([code, text]) => (
          <option key={code} value={code} className="text-ink">
            {text}
          </option>
        ))}
      </select>
      <ErrorText id={id} error={error} />
    </div>
  );
}

/* Choice chips (for short lists, easy to tap on a phone) -------------------- */

type ChoiceFieldProps = BaseProps & {
  value: string;
  onChange: (value: string) => void;
  options: Record<string, string>;
};

export function ChoiceField({ id, label, error, value, onChange, options }: ChoiceFieldProps) {
  return (
    <fieldset {...errorProps(id, error)}>
      <legend className="font-medium">{label}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {Object.entries(options).map(([code, text]) => (
          <label
            key={code}
            className={`flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-[15px] transition has-focus-visible:ring-3 has-focus-visible:ring-brand-soft ${
              value === code ? "border-ink bg-ink text-white" : "border-line hover:border-ink"
            }`}
          >
            <input
              type="radio"
              name={id}
              value={code}
              checked={value === code}
              onChange={() => onChange(code)}
              className="sr-only"
            />
            {text}
          </label>
        ))}
      </div>
      <ErrorText id={id} error={error} />
    </fieldset>
  );
}

/* Checkbox ------------------------------------------------------------------ */

type CheckboxFieldProps = {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
};

export function CheckboxField({ id, checked, onChange, children }: CheckboxFieldProps) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-3">
      <input
        id={id}
        name={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 size-5 shrink-0 accent-brand"
      />
      <span className="text-[15px] text-muted">{children}</span>
    </label>
  );
}
