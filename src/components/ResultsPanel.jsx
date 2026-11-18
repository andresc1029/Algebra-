import { Sparkles } from 'lucide-react';

export default function ResultsPanel({ 
  activeTab, 
  colsA, 
  gaussData, 
  detData, 
  opData 
}) {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <span>Solución y Demostración Paso a Paso</span>
        </h2>
        <span className="text-xs text-slate-400 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
          Aritmética Racional Exacta
        </span>
      </div>

      {activeTab === 'gauss' && gaussData && (
        <div className="space-y-6">
          <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
            gaussData.result.status === 'unique' 
              ? 'bg-emerald-950/30 border-emerald-800/50 text-emerald-200' 
              : gaussData.result.status === 'infinite'
              ? 'bg-amber-950/30 border-amber-800/50 text-amber-200'
              : 'bg-rose-950/30 border-rose-800/50 text-rose-200'
          }`}>
            <div>
              <h3 className="font-bold text-base flex items-center gap-2">
                {gaussData.result.status === 'unique' && 'El Sistema Tiene Solución Única'}
                {gaussData.result.status === 'infinite' && 'Infinitas Soluciones (Sistema Dependiente)'}
                {gaussData.result.status === 'none' && 'Sin Solución (Sistema Inconsistente)'}
              </h3>
              <p className="text-xs opacity-80 mt-0.5">
                {gaussData.result.status === 'unique' && 'La forma escalonada reducida se resolvió en columnas pivote independientes.'}
                {gaussData.result.status === 'infinite' && 'La matriz contiene variables libres.'}
                {gaussData.result.status === 'none' && 'La escalonada contiene una contradicción como [0 0 ... | c] donde c ≠ 0.'}
              </p>
            </div>

            {gaussData.result.status === 'unique' && (
              <div className="flex flex-wrap gap-2">
                {gaussData.result.solution.map((item, idx) => (
                  <div key={idx} className="bg-emerald-900/40 px-3 py-1.5 rounded-lg border border-emerald-700/50 font-mono text-sm">
                    <span className="text-emerald-400 font-bold">{item.variable}</span> = {item.value.toString()}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Pasos de Reducción:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gaussData.steps.map((step, idx) => (
                <div key={idx} className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between">
                  <div className="mb-3">
                    <span className="text-xs font-semibold text-indigo-400 block mb-1">Paso {idx + 1}</span>
                    <p className="text-xs text-slate-300 font-mono">{step.description}</p>
                  </div>

                  <div className="flex items-center justify-center py-2 bg-slate-900/60 rounded-lg border border-slate-800/50">
                    <div className="flex items-center">
                      <span className="text-xl text-slate-500 mr-1">[</span>
                      <div className="grid gap-x-3 gap-y-1 text-center font-mono text-xs">
                        {step.matrix.map((row, r) => (
                          <div key={r} className="flex space-x-3">
                            {row.map((val, c) => (
                              <span 
                                key={c} 
                                className={`w-8 text-center ${
                                  c === colsA 
                                    ? 'text-emerald-400 border-l border-slate-700 pl-2' 
                                    : 'text-slate-200'
                                }`}
                              >
                                {val.toString()}
                              </span>
                            ))}
                          </div>
                        ))}
                      </div>
                      <span className="text-xl text-slate-500 ml-1">]</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'det' && detData && (
        <div className="space-y-6">
          {detData.result?.error ? (
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50 text-rose-300 text-sm">
              {detData.result.error}
            </div>
          ) : (
            <>
              <div className="p-5 bg-indigo-950/30 border border-indigo-800/50 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs text-indigo-300 font-medium uppercase tracking-wider block">Resultado del Determinante</span>
                  <span className="text-2xl font-bold font-mono text-indigo-200 mt-1 block">
                    det(A) = {detData.result?.value?.toString()}
                  </span>
                </div>
                <div className="text-right text-xs text-slate-400">
                  <span>Propiedades: </span>
                  <span className={`font-semibold ${detData.result?.value?.isZero() ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {detData.result?.value?.isZero() ? 'Singular (No invertible)' : 'Invertible (No singular)'}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pasos a Forma Triangular Superior:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {detData.steps.map((step, idx) => (
                    <div key={idx} className="bg-slate-950 border border-slate-800/80 rounded-xl p-4">
                      <span className="text-xs font-semibold text-indigo-400 block mb-1">Paso {idx + 1}</span>
                      <p className="text-xs text-slate-300 font-mono mb-3">{step.description}</p>
                      
                      <div className="flex items-center justify-center py-2 bg-slate-900/60 rounded-lg border border-slate-800/50">
                        <span className="text-xl text-slate-500 mr-1">|</span>
                        <div className="grid gap-x-4 gap-y-1 text-center font-mono text-xs">
                          {step.matrix.map((row, r) => (
                            <div key={r} className="flex space-x-3">
                              {row.map((val, c) => (
                                <span key={c} className="w-8 text-center text-slate-200">
                                  {val.toString()}
                                </span>
                              ))}
                            </div>
                          ))}
                        </div>
                        <span className="text-xl text-slate-500 ml-1">|</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === 'ops' && opData && (
        <div className="space-y-6">
          {opData.result?.error ? (
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50 text-rose-300 text-sm">
              {opData.result.error}
            </div>
          ) : (
            <>
              <div className="p-5 bg-slate-950 border border-indigo-900/50 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-indigo-400 font-medium uppercase tracking-wider block">Resultado de la Operación ({opData.result?.title})</span>
                  <span className="text-sm text-slate-400 mt-1 block">Calculado con aritmética exacta de fracciones</span>
                </div>

                {opData.result?.matrix && (
                  <div className="flex items-center bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                    <span className="text-3xl text-indigo-500 mr-2">[</span>
                    <div className="grid gap-x-4 gap-y-2 font-mono text-sm">
                      {opData.result.matrix.map((row, r) => (
                        <div key={r} className="flex space-x-4">
                          {row.map((val, c) => (
                            <span key={c} className="w-10 text-center font-bold text-indigo-200">
                              {val.toString()}
                            </span>
                          ))}
                        </div>
                      ))}
                    </div>
                    <span className="text-3xl text-indigo-500 ml-2">]</span>
                  </div>
                )}
              </div>

              {opData.steps.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Demostración del Cálculo:</h4>
                  {opData.steps.map((step, idx) => (
                    <div key={idx} className="bg-slate-950 border border-slate-800/80 rounded-xl p-4">
                      <p className="text-xs text-slate-300 font-mono mb-3">{step.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}