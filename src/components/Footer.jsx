import { FileCode, Code } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>Aplicación Web de Álgebra Lineal — Lista para despliegue en GitHub Pages.</p>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><FileCode className="w-3.5 h-3.5" /> Arquitectura Modular en React</span>
          <span className="flex items-center gap-1"><Code className="w-3.5 h-3.5" /> Sitio Estático Listo</span>
        </div>
      </div>
    </footer>
  );
}