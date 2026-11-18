export default function MatrixInput({
  title,
  color = 'indigo',
  rows,
  cols,
  matrix,
  onResize,
  onCellChange,
  vectorB,
  onVectorBChange,
  showVectorB = false,
  selectedOp,
  onSelectOp,
  showOpSelect = false,
  onLoadPreset
}) {
  return (
    <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 shadow-xl backdrop-blur-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <span className={`w-3 h-3 rounded-full ${color === 'purple' ? 'bg-purple-500' : 'bg-indigo-500'}`}></span>
            <h2 className="font-semibold text-slate-200 text-base">
              {title === 'Matrix A' ? 'Matriz A' : title === 'Matrix B / Operations' ? 'Matriz B / Operaciones' : title}
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            {/* Selector de operación si está habilitado */}
            {showOpSelect && (
              <select
                value={selectedOp}
                onChange={(e) => onSelectOp(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-xs font-semibold text-indigo-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="add">Suma (A + B)</option>
                <option value="sub">Resta (A - B)</option>
                <option value="mul">Multiplicación (A × B)</option>
                <option value="transpose">Transpuesta (Aᵀ)</option>
                <option value="inverse">Inversa (A⁻¹)</option>
              </select>
            )}

            {/* Dimensiones (Filas x Columnas) siempre visibles para modificar la matriz correspondiente */}
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <span className="font-mono">Dim:</span>
              <div className="flex items-center space-x-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={rows}
                  onChange={(e) => onResize(parseInt(e.target.value) || 1, cols)}
                  className="w-8 bg-transparent text-center text-indigo-300 font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded"
                />
                <span>×</span>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={cols}
                  onChange={(e) => onResize(rows, parseInt(e.target.value) || 1)}
                  className="w-8 bg-transparent text-center text-indigo-300 font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-4 py-3">
          <div className="flex items-center">
            <div className={`border-l-2 border-t-2 border-b-2 ${color === 'purple' ? 'border-purple-500/60' : 'border-indigo-500/60'} rounded-l-lg w-3 self-stretch`}></div>
            
            <div 
              className="grid gap-2 p-2"
              style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
            >
              {matrix.map((row, r) =>
                row.map((val, c) => (
                  <input
                    key={`cell-${r}-${c}`}
                    type="text"
                    value={val.toString()}
                    onChange={(e) => onCellChange(r, c, e.target.value)}
                    className={`w-14 sm:w-16 h-11 bg-slate-950 border border-slate-800 rounded-xl text-center text-sm font-mono ${color === 'purple' ? 'text-purple-200 focus:border-purple-500 focus:ring-purple-500' : 'text-indigo-200 focus:border-indigo-500 focus:ring-indigo-500'} focus:ring-1 transition-all shadow-inner`}
                    placeholder="0"
                  />
                ))
              )}
            </div>

            <div className={`border-r-2 border-t-2 border-b-2 ${color === 'purple' ? 'border-purple-500/60' : 'border-indigo-500/60'} rounded-r-lg w-3 self-stretch`}></div>
          </div>

          {showVectorB && vectorB && (
            <div className="flex items-center pl-2 border-l border-slate-800">
              <span className="text-slate-500 font-mono font-bold mr-3 text-lg">=</span>
              <div className="flex flex-col gap-2">
                {vectorB.map((val, r) => (
                  <input
                    key={`b-${r}`}
                    type="text"
                    value={val.toString()}
                    onChange={(e) => onVectorBChange(r, e.target.value)}
                    className="w-14 sm:w-16 h-11 bg-indigo-950/30 border border-indigo-800/60 rounded-xl text-center text-sm font-mono text-emerald-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    placeholder="0"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {onLoadPreset && (
        <div className="pt-3 border-t border-slate-800/80 flex flex-wrap gap-2 text-xs">
          <span className="text-slate-500 self-center mr-1">Ajustes:</span>
          <button 
            onClick={() => onLoadPreset('system3x3')}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            Sistema 3x3
          </button>
          <button 
            onClick={() => onLoadPreset('singular')}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            Singular (Det=0)
          </button>
          <button 
            onClick={() => onLoadPreset('identity')}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            Identidad
          </button>
        </div>
      )}
    </div>
  );
}