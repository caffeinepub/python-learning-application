import { Textarea } from '@/components/ui/textarea';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function CodeEditor({ value, onChange, placeholder }: CodeEditorProps) {
  return (
    <div className="relative">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="font-mono text-sm min-h-[400px] resize-none bg-card"
        spellCheck={false}
      />
      <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
        Python 3.x
      </div>
    </div>
  );
}

