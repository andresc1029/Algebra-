import { Fraction } from '../utils/Fraction';
import { cloneMatrix } from '../utils/matrixUtils';

export function solveGaussJordan(matrixA, vectorB, rowsA, colsA) {
  const steps = [];
  const r = rowsA;
  const c = colsA;

  let aug = matrixA.map((row, i) => [...row, vectorB[i]]);

  steps.push({
    description: "Matriz aumentada inicial [A | b]",
    matrix: cloneMatrix(aug),
    pivot: null
  });

  let lead = 0;
  for (let row = 0; row < r; row++) {
    if (lead >= c) break;
    let pivotRow = row;

    while (aug[pivotRow][lead].isZero()) {
      pivotRow++;
      if (pivotRow === r) {
        pivotRow = row;
        lead++;
        if (lead === c) break;
      }
    }

    if (lead === c) break;

    if (pivotRow !== row) {
      let temp = aug[pivotRow];
      aug[pivotRow] = aug[row];
      aug[row] = temp;
      steps.push({
        description: `Intercambiar la fila ${row + 1} con la fila ${pivotRow + 1} (R_${row + 1} ↔ R_${pivotRow + 1})`,
        matrix: cloneMatrix(aug),
        pivot: [row, lead]
      });
    }

    const pivotVal = aug[row][lead];
    if (!pivotVal.isOne() && !pivotVal.isZero()) {
      aug[row] = aug[row].map(val => val.div(pivotVal));
      steps.push({
        description: `Dividir la fila ${row + 1} entre  (${pivotVal.toString()}) para obtener un pivote igual a 1 (R_${row + 1} ← R_${row + 1} / ${pivotVal.toString()})`,
        matrix: cloneMatrix(aug),
        pivot: [row, lead]
      });
    }

    for (let i = 0; i < r; i++) {
      if (i !== row) {
        const factor = aug[i][lead];
        if (!factor.isZero()) {
          aug[i] = aug[i].map((val, colIdx) => val.sub(factor.mul(aug[row][colIdx])));
          steps.push({
            description: `Eliminar la entrada de la columna en la fila ${i + 1}: (R_${i + 1} ← R_${i + 1} - (${factor.toString()}) · R_${row + 1})`,
            matrix: cloneMatrix(aug),
            pivot: [row, lead]
          });
        }
      }
    }
    lead++;
  }

  let status = 'unique';
  const solution = [];

  for (let i = 0; i < r; i++) {
    const allZerosA = aug[i].slice(0, c).every(val => val.isZero());
    const bVal = aug[i][c];

    if (allZerosA && !bVal.isZero()) {
      status = 'none';
      break;
    }
  }

  if (status !== 'none') {
    if (r < c) {
      status = 'infinite';
    } else {
      for (let i = 0; i < c; i++) {
        solution.push({
          variable: `x_${i + 1}`,
          value: aug[i] ? aug[i][c] : Fraction.from(0)
        });
      }
    }
  }

  return { steps, result: { status, solution, finalAugmented: aug } };
}