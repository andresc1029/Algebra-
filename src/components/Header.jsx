import { Calculator, Sparkles, Check, Copy } from 'lucide-react';

export default function Header({ onLoadPreset, onCopyLaTeX, copiedTex }) {
  return (
    <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Calculator className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-slate-100 tracking-tight flex items-center gap-2">
              Lo imad<span className="text-indigo-400 font-mono text-sm px-2 py-0.5 rounded bg-indigo-950/80 border border-indigo-800/60">Beta</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={() => onLoadPreset('system3x3')}
            className="text-xs px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Predeterminado</span>
          </button>
          <button
            onClick={onCopyLaTeX}
            className="text-xs px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 transition-all flex items-center gap-1.5"
          >
            {copiedTex ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedTex ? '¡LaTeX Copiado!' : 'Copiar LaTeX'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}