import { HelpCircle, Info } from 'lucide-react';

export default function InfoCard({ activeTab, selectedOp }) {
  if (activeTab === 'ops' && (selectedOp === 'transpose' || selectedOp === 'inverse')) {
    return (
      <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col items-center justify-center h-full text-slate-500 text-xs text-center px-4">
        <Info className="w-6 h-6 mb-2 text-indigo-400" />
        <p>
          {selectedOp === 'transpose' 
            ? 'La operación transpuesta se aplica directamente sobre la Matriz A intercambiando filas por columnas.' 
            : 'La matriz inversa se calcula sobre la Matriz A mediante la reducción de Gauss-Jordan aumentándole la matriz identidad [A | I].'}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-indigo-400" />
          {activeTab === 'gauss' ? 'Eliminación de Gauss-Jordan' : 'Cálculo del Determinante'}
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed mb-3">
          {activeTab === 'gauss' 
            ? 'Transforma la matriz a su Forma Escalonada Reducida por Filas (RREF) mediante operaciones elementales (Escalar, Intercambiar, Sumar/Restar múltiplos) para encontrar soluciones fraccionarias exactas.'
            : 'Calcula el valor del determinante utilizando eliminación gaussiana para llevar la matriz a su forma triangular superior. El determinante es el producto de los elementos de la diagonal.'}
        </p>
      </div>
    </div>
  );
}