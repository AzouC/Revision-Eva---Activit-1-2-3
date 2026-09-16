interface CodeBlockProps {
  code: string;
  label?: string;
}

export default function CodeBlock({ code, label }: CodeBlockProps) {
  return (
    <div className="my-3 overflow-hidden rounded-lg border border-slate-700/60 bg-slate-950 shadow-inner">
      {label && (
        <div className="flex items-center gap-2 border-b border-slate-700/60 bg-slate-800/80 px-4 py-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
          <span className="ml-2 font-mono text-xs text-slate-400">{label}</span>
        </div>
      )}
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code className="font-mono text-emerald-300">{code}</code>
      </pre>
    </div>
  );
}
