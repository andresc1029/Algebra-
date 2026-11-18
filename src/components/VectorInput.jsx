
import { useState } from 'react';
import { Plus, RotateCcw } from 'lucide-react';

export default function VectorInput({
  dimension,
  setDimension,
  vectorA,
  setVectorA,
  vectorB,
  setVectorB,
  selectedOp,
  setSelectedOp
}) {
  const [inputError, setInputError] = useState('');

  const operations = [
    { value: 'magnitude', label: 'Magnitud de A' },
    { value: 'direction', label: 'Dirección de A' },
    { value: 'add', label: 'Suma (A + B)' },
    { value: 'sub', label: 'Resta (A - B)' },
    { value: 'dot', label: 'Producto escalar' },
    { value: 'cross', label: 'Producto vectorial' }
  ];

  const needsB = !['magnitude', 'direction'].includes(selectedOp);

  const updateVector = (vector, setter, index, value) => {
    const updated = [...vector];

    if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
      updated[index] = value;
      setter(updated);
      setInputError('');
    }
  };

  const changeDimension = (newDimension) => {
    setDimension(newDimension);

    setVectorA((previous) =>
      Array.from({ length: newDimension }, (_, i) => previous[i] ?? 0)
    );

    setVectorB((previous) =>
      Array.from({ length: newDimension }, (_, i) => previous[i] ?? 0)
    );

    if (newDimension === 2 && selectedOp === 'cross') {
      setSelectedOp('add');
    }
  };

  const resetVectors = () => {
    setVectorA(Array(dimension).fill(0));
    setVectorB(Array(dimension).fill(0));
    setInputError('');
  };

  const renderVector = (vector, setter, label, color) => (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4">
      <h3 className={`font-semibold mb-4 ${color}`}>
        Vector {label}
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {vector.map((value, index) => (
          <div key={index}>
            <label className="block text-xs text-slate-400 mb-2">
              Componente {['X', 'Y', 'Z'][index]}
            </label>

            <input
              type="number"
              step="any"
              value={value}
              onChange={(e) =>
                updateVector(vector, setter, index, e.target.value)
              }
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-3 text-white outline-none focus:border-indigo-500"
            />
          </div>
        ))}
      </div>
    </div>
  );

  const validate = () => {
    const vectors = needsB ? [...vectorA, ...vectorB] : vectorA;

    if (vectors.some((value) => value === '' || !Number.isFinite(Number(value)))) {
      setInputError('Completa todos los componentes con valores numéricos.');
      return;
    }

    setInputError('');
  };

  return (
    <section className="bg-slate-950 border border-slate-800 rounded-3xl p-5 space-y-5">

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-white">
            Calculadora de vectores
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Introduce las componentes de tus vectores.
          </p>
        </div>

        <button
          onClick={resetVectors}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white"
        >
          <RotateCcw size={16} />
          Reiniciar
        </button>
      </div>

      <div>
        <label className="block text-sm text-slate-300 mb-2">
          Dimensión del espacio
        </label>

        <div className="flex gap-2">
          {[2, 3].map((value) => (
            <button
              key={value}
              onClick={() => changeDimension(value)}
              className={`px-5 py-2 rounded-xl font-medium transition ${
                dimension === value
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {value}D
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm text-slate-300 mb-2">
          Operación matemática
        </label>

        <select
          value={selectedOp}
          onChange={(e) => setSelectedOp(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
        >
          {operations
            .filter((op) => !(dimension === 2 && op.value === 'cross'))
            .map((op) => (
              <option key={op.value} value={op.value}>
                {op.label}
              </option>
            ))}
        </select>
      </div>

      <div className={`grid grid-cols-1 ${needsB ? 'lg:grid-cols-2' : ''} gap-4`}>
        {renderVector(vectorA, setVectorA, 'A', 'text-indigo-400')}

        {needsB && renderVector(vectorB, setVectorB, 'B', 'text-purple-400')}
      </div>

      {inputError && (
        <p className="text-sm text-red-400">{inputError}</p>
      )}

      <button
        onClick={validate}
        className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl py-3 transition"
      >
        <Plus size={18} />
        Validar componentes
      </button>

    </section>
  );
}
