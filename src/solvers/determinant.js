import { Fraction } from '../utils/Fraction';
import { cloneMatrix } from '../utils/matrixUtils';

export function solveDeterminant(matrixA, rowsA, colsA) {
  if (rowsA !== colsA) {
    return { steps: [], result: { error: "El determinante requiere una matriz cuadrada (N x N)." } };
  }

  const steps = [];
  const n = rowsA;

  let copy = cloneMatrix(matrixA);
  let det = Fraction.from(1);
  let swapCount = 0;

  steps.push({
    description: "Matriz inicial A para calcular el determinante",
    matrix: cloneMatrix(copy),
    multiplier: Fraction.from(1)
  });

  for (let i = 0; i < n; i++) {
    let pivot = i;
    while (pivot < n && copy[pivot][i].isZero()) {
      pivot++;
    }

    if (pivot === n) {
      det = Fraction.from(0);
      steps.push({
        description: `La columna ${i + 1} contiene únicamente ceros debajo o en la posición del pivote. El determinante es 0.`,
        matrix: cloneMatrix(copy),
        multiplier: Fraction.from(0)
      });
      break;
    }

    if (pivot !== i) {
      let temp = copy[i];
      copy[i] = copy[pivot];
      copy[pivot] = temp;
      swapCount++;
      steps.push({
        description: `Intercambiar la fila ${i + 1} con la fila ${pivot + 1} (El intercambio de filas cambia el signo del determinante)`,
        matrix: cloneMatrix(copy),
        multiplier: Fraction.from(Math.pow(-1, swapCount))
      });
    }

    for (let j = i + 1; j < n; j++) {
      if (!copy[j][i].isZero()) {
        const factor = copy[j][i].div(copy[i][i]);
        copy[j] = copy[j].map((val, k) => val.sub(factor.mul(copy[i][k])));
        steps.push({
          description: `Operación elemental por filas: R_${j + 1} ← R_${j + 1} - (${factor.toString()}) · R_${i + 1}`,
          matrix: cloneMatrix(copy),
          multiplier: Fraction.from(Math.pow(-1, swapCount))
        });
      }
    }
  }

  if (!det.isZero()) {
    let diagProd = Fraction.from(1);
    for (let i = 0; i < n; i++) {
      diagProd = diagProd.mul(copy[i][i]);
    }
    if (swapCount % 2 !== 0) {
      diagProd = diagProd.negate();
    }
    det = diagProd;
  }

  return { steps, result: { value: det, isSquare: true } };
}