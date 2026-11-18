
import { CheckCircle2, Calculator, BookOpen } from 'lucide-react';

export default function VectorResults({ data, error }) {
  if (error) {
    return (
      <div className="bg-red-950/30 border border-red-800/50 rounded-2xl p-5">
        <div className="flex items-center gap-2 text-red-400 font-semibold mb-2">
          <Calculator size={18} />
          No se pudo realizar el cálculo
        </div>
        <p className="text-sm text-red-300">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 text-center">
        <Calculator className="mx-auto text-slate-500 mb-3" size={28} />
        <p className="text-slate-400">
          Introduce tus vectores para visualizar los resultados.
        </p>
      </div>
    );
  }

  const formatResult = (result) => {
    if (typeof result === 'number') {
      return Number(result.toFixed(4)).toString();
    }

    if (Array.isArray(result)) {
      return `(${result.map((value) => Number(value.toFixed(4))).join(', ')})`;
    }

    if (result && typeof result === 'object') {
      if (typeof result.angle === 'number') {
        return `${result.angle.toFixed(2)}°`;
      }

      if (Array.isArray(result.angles)) {
        return `α = ${result.angles[0].toFixed(2)}°, β = ${result.angles[1].toFixed(2)}°, γ = ${result.angles[2].toFixed(2)}°`;
      }
    }

    return String(result);
  };

  return (
    <section className="space-y-4">

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div className="flex items-center gap-2 text-emerald-400 mb-4">
          <CheckCircle2 size={20} />
          <h3 className="font-semibold">Resultado del cálculo</h3>
        </div>

        <div className="bg-slate-950 rounded-xl p-5 text-center">
          <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">
            Resultado
          </p>

          <p className="text-2xl sm:text-3xl font-bold text-white break-words">
            {formatResult(data.result)}
          </p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div className="flex items-center gap-2 text-indigo-400 mb-4">
          <BookOpen size={20} />
          <h3 className="font-semibold">Procedimiento matemático</h3>
        </div>

        <div className="space-y-4">
          {data.steps?.map((step, index) => (
            <div
              key={index}
              className="border-l-2 border-indigo-500 pl-4 py-1"
            >
              <p className="text-sm text-slate-300 mb-2">
                {step.description}
              </p>

              <div className="bg-slate-950 rounded-lg p-3 space-y-2">
                <p className="text-indigo-300 font-mono text-sm">
                  {step.formula}
                </p>

                <p className="text-emerald-400 font-mono text-sm">
                  {step.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
