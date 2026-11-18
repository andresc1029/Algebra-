
export default function VectorGraph({
  dimension,
  vectorA,
  vectorB,
  selectedOp
}) {
  const width = 440;
  const height = 340;
  const centerX = width / 2;
  const centerY = height / 2;

  const A = vectorA.map(Number);
  const B = vectorB.map(Number);

  const needsB = !['magnitude', 'direction'].includes(selectedOp);

  const validA = A.every(Number.isFinite);
  const validB = B.every(Number.isFinite);

  const maxValue = Math.max(
    5,
    ...A.map(Math.abs),
    ...(needsB ? B.map(Math.abs) : [])
  );

  const scale = 125 / maxValue;

  const project = (vector) => {
    const [x = 0, y = 0, z = 0] = vector;

    if (dimension === 2) {
      return {
        x: centerX + x * scale,
        y: centerY - y * scale
      };
    }

    return {
      x: centerX + (x - z * 0.5) * scale,
      y: centerY - (y - z * 0.5) * scale
    };
  };

  const pointA = project(A);
  const pointB = project(B);

  const renderArrow = (point, color, marker) => (
    <>
      <line
        x1={centerX}
        y1={centerY}
        x2={point.x}
        y2={point.y}
        stroke={color}
        strokeWidth="3"
        markerEnd={`url(#${marker})`}
      />

      <text
        x={point.x + 8}
        y={point.y - 8}
        fill={color}
        fontSize="13"
        fontWeight="bold"
      >
        {marker === 'arrowA' ? 'A' : 'B'}
      </text>
    </>
  );

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">

      <div>
        <h3 className="text-lg font-semibold text-white">
          Representación gráfica
        </h3>

        <p className="text-sm text-slate-400 mt-1">
          Visualización de los vectores en el espacio {dimension}D.
        </p>
      </div>

      <div className="bg-slate-950 rounded-xl p-2 overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto"
        >
          <defs>
            <marker
              id="arrowA"
              markerWidth="8"
              markerHeight="8"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L0,6 L6,3 Z" fill="#818cf8" />
            </marker>

            <marker
              id="arrowB"
              markerWidth="8"
              markerHeight="8"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L0,6 L6,3 Z" fill="#c084fc" />
            </marker>
          </defs>

          {dimension === 2 ? (
            <>
              {Array.from({ length: 11 }, (_, i) => {
                const offset = (i - 5) * 25;

                return (
                  <g key={i}>
                    <line
                      x1={centerX + offset}
                      y1="20"
                      x2={centerX + offset}
                      y2="320"
                      stroke="#334155"
                      strokeWidth="0.7"
                    />

                    <line
                      x1="20"
                      y1={centerY + offset}
                      x2="420"
                      y2={centerY + offset}
                      stroke="#334155"
                      strokeWidth="0.7"
                    />
                  </g>
                );
              })}

              <line
                x1="20"
                y1={centerY}
                x2="420"
                y2={centerY}
                stroke="#94a3b8"
                strokeWidth="1.5"
              />

              <line
                x1={centerX}
                y1="20"
                x2={centerX}
                y2="320"
                stroke="#94a3b8"
                strokeWidth="1.5"
              />

              <text x="414" y={centerY - 10} fill="#94a3b8">X</text>
              <text x={centerX + 10} y="28" fill="#94a3b8">Y</text>
              <text x={centerX + 8} y={centerY + 15} fill="#94a3b8">0</text>
            </>
          ) : (
            <>
              <line
                x1={centerX - 150}
                y1={centerY + 75}
                x2={centerX + 150}
                y2={centerY - 75}
                stroke="#64748b"
                strokeWidth="1.5"
              />

              <line
                x1={centerX - 100}
                y1={centerY + 100}
                x2={centerX + 100}
                y2={centerY - 100}
                stroke="#64748b"
                strokeWidth="1.5"
              />

              <line
                x1={centerX}
                y1="25"
                x2={centerX}
                y2="315"
                stroke="#64748b"
                strokeWidth="1.5"
              />

              <text x={centerX + 8} y="25" fill="#94a3b8">Y</text>
              <text x="390" y={centerY - 65} fill="#94a3b8">X</text>
              <text x="75" y={centerY + 105} fill="#94a3b8">Z</text>
              <text x={centerX + 8} y={centerY + 15} fill="#94a3b8">0</text>
            </>
          )}

          <circle
            cx={centerX}
            cy={centerY}
            r="4"
            fill="white"
          />

          {validA && renderArrow(pointA, '#818cf8', 'arrowA')}

          {needsB && validB && renderArrow(pointB, '#c084fc', 'arrowB')}
        </svg>
      </div>

      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-indigo-400" />
          <span className="text-slate-300">Vector A</span>
        </div>

        {needsB && (
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-purple-400" />
            <span className="text-slate-300">Vector B</span>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-500">
        La representación 3D utiliza una proyección isométrica en un plano 2D.
        No es un modelo tridimensional interactivo.
      </p>

    </section>
  );
}
