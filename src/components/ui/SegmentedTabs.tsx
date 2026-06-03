interface Option {
  label: string;
  value: string;
}

interface SegmentedTabsProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export default function SegmentedTabs({ label, onChange, options, value }: SegmentedTabsProps) {
  return (
    <div className="segmented" aria-label={label}>
      {options.map((option) => (
        <button
          className={option.value === value ? 'is-active' : ''}
          key={option.value}
          onClick={() => onChange(option.value)}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
