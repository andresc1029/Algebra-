
export function solveVectors(vectorA, vectorB, selectedOp) {
  const isValidVector = (vector) =>
    Array.isArray(vector) &&
    (vector.length === 2 || vector.length === 3) &&
    vector.every((value) => Number.isFinite(Number(value)));

  if (!isValidVector(vectorA)) {
    return { error: 'El vector A debe tener 2 o 3 componentes válidas.' };
  }

  if (selectedOp !== 'magnitude' && selectedOp !== 'direction' && !isValidVector(vectorB)) {
    return { error: 'El vector B debe tener 2 o 3 componentes válidas.' };
  }

  if (
    selectedOp !== 'magnitude' &&
    selectedOp !== 'direction' &&
    vectorA.length !== vectorB.length
  ) {
    return { error: 'Ambos vectores deben tener la misma dimensión.' };
  }

  const A = vectorA.map(Number);
  const B = vectorB?.map(Number) ?? [];

  const magnitude = (v) =>
    Math.sqrt(v.reduce((sum, value) => sum + value ** 2, 0));

  const formatVector = (v) => `(${v.join(', ')})`;

  let result;
let steps;

  switch (selectedOp) {
    case 'magnitude': {
      const value = magnitude(A);

      result = value;
      steps = [
        {
          description: 'Calculamos la magnitud del vector A.',
          formula: '|A| = √(x² + y² + z²)',
          value: `|A| = ${value.toFixed(4)}`
        }
      ];
      break;
    }

    case 'direction': {
      if (A.every((value) => value === 0)) {
        return { error: 'El vector cero no tiene dirección definida.' };
      }

      if (A.length === 2) {
        let angle = Math.atan2(A[1], A[0]) * (180 / Math.PI);
        if (angle < 0) angle += 360;

        result = { angle, radians: angle * Math.PI / 180 };

        steps = [
          {
            description: 'Calculamos el ángulo de dirección respecto al eje X positivo.',
            formula: 'θ = atan2(y, x)',
            value: `θ = ${angle.toFixed(2)}°`
          }
        ];
      } else {
        const mag = magnitude(A);
        const angles = A.map(
          (value) => Math.acos(Math.max(-1, Math.min(1, value / mag))) * (180 / Math.PI)
        );

        result = { angles, magnitude: mag };

        steps = [
          {
            description: 'Calculamos los ángulos directores respecto a los ejes X, Y y Z.',
            formula: 'α = acos(x/|A|), β = acos(y/|A|), γ = acos(z/|A|)',
            value: `α = ${angles[0].toFixed(2)}°, β = ${angles[1].toFixed(2)}°, γ = ${angles[2].toFixed(2)}°`
          }
        ];
      }
      break;
    }

    case 'add': {
      result = A.map((value, i) => value + B[i]);
      steps = [
        {
          description: 'Sumamos las componentes correspondientes.',
          formula: 'A + B',
          value: `${formatVector(A)} + ${formatVector(B)} = ${formatVector(result)}`
        }
      ];
      break;
    }

    case 'sub': {
      result = A.map((value, i) => value - B[i]);
      steps = [
        {
          description: 'Restamos las componentes correspondientes.',
          formula: 'A - B',
          value: `${formatVector(A)} - ${formatVector(B)} = ${formatVector(result)}`
        }
      ];
      break;
    }

    case 'dot': {
      result = A.reduce((sum, value, i) => sum + value * B[i], 0);
      steps = [
        {
          description: 'Multiplicamos las componentes correspondientes y sumamos.',
          formula: 'A · B = x₁x₂ + y₁y₂ + z₁z₂',
          value: `Resultado = ${result}`
        }
      ];
      break;
    }

    case 'cross': {
      if (A.length !== 3) {
        return { error: 'El producto vectorial requiere vectores de 3 dimensiones.' };
      }

      result = [
        A[1] * B[2] - A[2] * B[1],
        A[2] * B[0] - A[0] * B[2],
        A[0] * B[1] - A[1] * B[0]
      ];

      steps = [
        {
          description: 'Calculamos el producto vectorial mediante el determinante.',
          formula: 'A × B',
          value: formatVector(result)
        }
      ];
      break;
    }

    default:
      return { error: 'Operación no reconocida.' };
  }

  return { result, steps };
}
