import type { InputHTMLAttributes } from 'react';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function TextField({ id, label, ...props }: TextFieldProps) {
  const fieldId = id ?? label.replace(/\s+/g, '-');
  return (
    <label className="field" htmlFor={fieldId}>
      <span>{label}</span>
      <input id={fieldId} {...props} />
    </label>
  );
}
