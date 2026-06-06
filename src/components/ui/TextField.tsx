import type { InputHTMLAttributes } from 'react';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  hideLabel?: boolean;
  label: string;
}

export default function TextField({ hideLabel, id, label, ...props }: TextFieldProps) {
  const fieldId = id ?? label.replace(/\s+/g, '-');
  return (
    <label className="field" htmlFor={fieldId}>
      <span className={hideLabel ? 'sr-only' : undefined}>{label}</span>
      <input id={fieldId} {...props} />
    </label>
  );
}
