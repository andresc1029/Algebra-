import { Fraction } from '../utils/Fraction';
import { createMatrix, cloneMatrix } from '../utils/matrixUtils';

export function solveOperation(matrixA, matrixB, selectedOp, rowsA, colsA, rowsB, colsB) {
  const steps = [];

  if (selectedOp === 'add' || selectedOp === 'sub') {
    if (rowsA !== rowsB || colsA !== colsB) {
      return { 
        steps: [], 
        result: { error: `Las matrices deben tener dimensiones idénticas para realizar ${selectedOp === 'add' ? 'la suma' : 'la resta'}. La matriz A es de ${rowsA}x${colsA}, la matriz B es de ${rowsB}x${colsB}.` } 
      };
    }

    const res = createMatrix(rowsA, colsA);
    for (let r = 0; r < rowsA; r++) {
      for (let c = 0; c < colsA; c++) {
        res[r][c] = selectedOp === 'add' 
          ? matrixA[r][c].add(matrixB[r][c])
          : matrixA[r][c].sub(matrixB[r][c]);
      }
    }

    steps.push({
      description: `Suma elemento a elemento de matrices (A + B)` .replace('(A + B)', selectedOp === 'add' ? '(A + B)' : '(A - B)'),
      matrix: res
    });

    return { steps, result: { matrix: res, title: selectedOp === 'add' ? 'A + B' : 'A - B' } };
  }

  if (selectedOp === 'mul') {
    if (colsA !== rowsB) {
      return { 
        steps: [], 
        result: { error: `La multiplicación de matrices requiere que el número de columnas de A (${colsA}) sea igual al número de filas de B (${rowsB}).` } 
      };
    }

    const res = createMatrix(rowsA, colsB);
    for (let r = 0; r < rowsA; r++) {
      for (let c = 0; c < colsB; c++) {
        let sum = Fraction.from(0);
        for (let k = 0; k < colsA; k++) {
          sum = sum.add(matrixA[r][k].mul(matrixB[k][c]));
        }
        res[r][c] = sum;
      }
    }

    steps.push({
      description: `Multiplicación de matrices (A × B) de dimensiones (${rowsA}x${colsA}) × (${rowsB}x${colsB}) → Tamaño del resultado (${rowsA}x${colsB})`,
      matrix: res
    });

    return { steps, result: { matrix: res, title: 'A × B' } };
  }

  if (selectedOp === 'transpose') {
    const res = createMatrix(colsA, rowsA);
    for (let r = 0; r < rowsA; r++) {
      for (let c = 0; c < colsA; c++) {
        res[c][r] = matrixA[r][c];
      }
    }

    steps.push({
      description: `Transpuesta de la matriz A (Aᵀ), intercambiando filas por columnas (${rowsA}x${colsA} → ${colsA}x${rowsA})`,
      matrix: res
    });

    return { steps, result: { matrix: res, title: 'Aᵀ' } };
  }

  if (selectedOp === 'inverse') {
    if (rowsA !== colsA) {
      return { steps: [], result: { error: "Solo las matrices cuadradas tienen inversa." } };
    }

    const n = rowsA;
    let aug = matrixA.map((row, i) => {
      const eye = Array.from({ length: n }, (_, j) => Fraction.from(i === j ? 1 : 0));
      return [...row, ...eye];
    });

    steps.push({
      description: "Formar la matriz aumentada [A | I]",
      matrix: cloneMatrix(aug),
      isAugmentedInverse: true
    });

    let lead = 0;
    for (let row = 0; row < n; row++) {
      let pivotRow = row;
      while (aug[pivotRow][lead].isZero()) {
        pivotRow++;
        if (pivotRow === n) {
          return { steps: [], result: { error: "La matriz debe ser cuadrada (mismo número de filas y columnas) para calcular su inversa." } };
        }
      }

      if (pivotRow !== row) {
        let temp = aug[pivotRow];
        aug[pivotRow] = aug[row];
        aug[row] = temp;
        steps.push({
          description: `Intercambiar la fila ${row + 1} con la fila ${pivotRow + 1}`,
          matrix: cloneMatrix(aug),
          isAugmentedInverse: true
        });
      }

      const pivotVal = aug[row][lead];
      aug[row] = aug[row].map(v => v.div(pivotVal));
      steps.push({
        description: `Multiplicar la fila ${row + 1} por 1/(${pivotVal.toString()}) para obtener un pivote = 1`,
        matrix: cloneMatrix(aug),
        isAugmentedInverse: true
      });

      for (let i = 0; i < n; i++) {
        if (i !== row) {
          const factor = aug[i][lead];
          if (!factor.isZero()) {
            aug[i] = aug[i].map((v, k) => v.sub(factor.mul(aug[row][k])));
            steps.push({
              description: `Eliminar la entrada de la columna en la fila ${i + 1}: R_${i + 1} ← R_${i + 1} - (${factor.toString()}) · R_${row + 1}`,
              matrix: cloneMatrix(aug),
              isAugmentedInverse: true
            });
          }
        }
      }
      lead++;
    }

    const invMatrix = aug.map(row => row.slice(n));
    return { steps, result: { matrix: invMatrix, title: 'A⁻¹' } };
  }

  return { steps, result: null };
}