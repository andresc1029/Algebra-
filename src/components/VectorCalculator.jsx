
import { useMemo, useState } from 'react';

import { solveVectors } from '../solvers/vectors';

import VectorInput from './VectorInput';
import VectorResults from './VectorResults';
import VectorGraph from './VectorGraph';

export default function VectorCalculator() {
  // Configuración inicial
  const [dimension, setDimension] = useState(2);

  const [vectorA, setVectorA] = useState([3, 4]);
  const [vectorB, setVectorB] = useState([1, 2]);

  const [selectedOp, setSelectedOp] = useState('magnitude');

  // Ejecutar el cálculo cuando cambien los datos
  const calculation = useMemo(() => {
    return solveVectors(vectorA, vectorB, selectedOp);
  }, [vectorA, vectorB, selectedOp]);

  const error = calculation?.error;
  const data = error ? null : calculation;

  return (
    <div className="space-y-6">

      {/* Encabezado */}
      <div>
        <h2 className="text-2xl font-bold text-white">
          Álgebra vectorial
        </h2>

        <p className="text-slate-400 mt-2">
          Calcula operaciones vectoriales, estudia sus propiedades
          y visualiza su representación en el espacio.
        </p>
      </div>

      {/* Entrada de datos */}
      <VectorInput
        dimension={dimension}
        setDimension={setDimension}
        vectorA={vectorA}
        setVectorA={setVectorA}
        vectorB={vectorB}
        setVectorB={setVectorB}
        selectedOp={selectedOp}
        setSelectedOp={setSelectedOp}
      />

      {/* Resultados */}
      <VectorResults
        data={data}
        error={error}
      />

      {/* Representación gráfica */}
      <VectorGraph
        dimension={dimension}
        vectorA={vectorA}
        vectorB={vectorB}
        selectedOp={selectedOp}
      />

    </div>
  );
}
