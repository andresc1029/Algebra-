
import { useState, useMemo } from 'react';

import { Fraction } from './utils/Fraction';
import { cloneMatrix } from './utils/matrixUtils';

import { solveGaussJordan } from './solvers/gaussJordan';
import { solveDeterminant } from './solvers/determinant';
import { solveOperation } from './solvers/operations';

import Header from './components/Header';
import Tabs from './components/Tabs';
import MatrixInput from './components/MatrixInput';
import InfoCard from './components/InfoCard';
import ResultsPanel from './components/ResultsPanel';
import Footer from './components/Footer';
import VectorCalculator from './components/VectorCalculator';

export default function App() {
  const [activeTab, setActiveTab] = useState('gauss');

  const [rowsA, setRowsA] = useState(3);
  const [colsA, setColsA] = useState(3);

  const [matrixA, setMatrixA] = useState([
    [Fraction.from(2), Fraction.from(1), Fraction.from(-1)],
    [Fraction.from(-3), Fraction.from(-1), Fraction.from(2)],
    [Fraction.from(-2), Fraction.from(1), Fraction.from(2)]
  ]);

  const [vectorB, setVectorB] = useState([
    Fraction.from(8),
    Fraction.from(-11),
    Fraction.from(-3)
  ]);

  const [rowsB, setRowsB] = useState(3);
  const [colsB, setColsB] = useState(3);

  const [matrixB, setMatrixB] = useState([
    [Fraction.from(1), Fraction.from(0), Fraction.from(2)],
    [Fraction.from(0), Fraction.from(1), Fraction.from(1)],
    [Fraction.from(3), Fraction.from(2), Fraction.from(0)]
  ]);

  const [selectedOp, setSelectedOp] = useState('add');
  const [copiedTex, setCopiedTex] = useState(false);

  const handleResizeA = (newR, newC) => {
    newR = Math.max(1, Math.min(5, newR));
    newC = Math.max(1, Math.min(5, newC));

    setRowsA(newR);
    setColsA(newC);

    const newMat = Array.from({ length: newR }, (_, r) =>
      Array.from({ length: newC }, (_, c) =>
        matrixA[r] && matrixA[r][c]
          ? matrixA[r][c]
          : Fraction.from(0)
      )
    );

    setMatrixA(newMat);

    const newVecB = Array.from({ length: newR }, (_, r) =>
      vectorB[r] !== undefined
        ? vectorB[r]
        : Fraction.from(0)
    );

    setVectorB(newVecB);
  };

  const handleResizeB = (newR, newC) => {
    newR = Math.max(1, Math.min(5, newR));
    newC = Math.max(1, Math.min(5, newC));

    setRowsB(newR);
    setColsB(newC);

    const newMat = Array.from({ length: newR }, (_, r) =>
      Array.from({ length: newC }, (_, c) =>
        matrixB[r] && matrixB[r][c]
          ? matrixB[r][c]
          : Fraction.from(0)
      )
    );

    setMatrixB(newMat);
  };

  const handleCellChangeA = (r, c, val) => {
    const updated = cloneMatrix(matrixA);

    try {
      updated[r][c] = Fraction.from(val);
    } catch {
      updated[r][c] = Fraction.from(0);
    }

    setMatrixA(updated);
  };

  const handleVecBChange = (r, val) => {
    const updated = [...vectorB];

    try {
      updated[r] = Fraction.from(val);
    } catch {
      updated[r] = Fraction.from(0);
    }

    setVectorB(updated);
  };

  const handleCellChangeB = (r, c, val) => {
    const updated = cloneMatrix(matrixB);

    try {
      updated[r][c] = Fraction.from(val);
    } catch {
      updated[r][c] = Fraction.from(0);
    }

    setMatrixB(updated);
  };

  const loadPreset = (presetType) => {
    if (presetType === 'system3x3') {
      setRowsA(3);
      setColsA(3);

      setMatrixA([
        [Fraction.from(2), Fraction.from(1), Fraction.from(-1)],
        [Fraction.from(-3), Fraction.from(-1), Fraction.from(2)],
        [Fraction.from(-2), Fraction.from(1), Fraction.from(2)]
      ]);

      setVectorB([
        Fraction.from(8),
        Fraction.from(-11),
        Fraction.from(-3)
      ]);

    } else if (presetType === 'singular') {
      setRowsA(3);
      setColsA(3);

      setMatrixA([
        [Fraction.from(1), Fraction.from(2), Fraction.from(3)],
        [Fraction.from(4), Fraction.from(5), Fraction.from(6)],
        [Fraction.from(7), Fraction.from(8), Fraction.from(9)]
      ]);

      setVectorB([
        Fraction.from(1),
        Fraction.from(2),
        Fraction.from(3)
      ]);

    } else if (presetType === 'identity') {
      setRowsA(3);
      setColsA(3);

      setMatrixA([
        [Fraction.from(1), Fraction.from(0), Fraction.from(0)],
        [Fraction.from(0), Fraction.from(1), Fraction.from(0)],
        [Fraction.from(0), Fraction.from(0), Fraction.from(1)]
      ]);

      setVectorB([
        Fraction.from(1),
        Fraction.from(1),
        Fraction.from(1)
      ]);
    }
  };

  const copyAsLaTeX = () => {
    let latex = '\\begin{bmatrix}\n';

    matrixA.forEach((row, idx) => {
      latex +=
        '  ' +
        row.map(v => v.toTex()).join(' & ') +
        (idx < matrixA.length - 1 ? ' \\\\\n' : '\n');
    });

    latex += '\\end{bmatrix}';

    navigator.clipboard.writeText(latex);

    setCopiedTex(true);
    setTimeout(() => setCopiedTex(false), 2000);
  };

  const gaussData = useMemo(() => {
    if (activeTab !== 'gauss') return null;

    return solveGaussJordan(
      matrixA,
      vectorB,
      rowsA,
      colsA
    );
  }, [activeTab, matrixA, vectorB, rowsA, colsA]);

  const detData = useMemo(() => {
    if (activeTab !== 'det') return null;

    return solveDeterminant(
      matrixA,
      rowsA,
      colsA
    );
  }, [activeTab, matrixA, rowsA, colsA]);

  const opData = useMemo(() => {
    if (activeTab !== 'ops') return null;

    return solveOperation(
      matrixA,
      matrixB,
      selectedOp,
      rowsA,
      colsA,
      rowsB,
      colsB
    );
  }, [
    activeTab,
    matrixA,
    matrixB,
    selectedOp,
    rowsA,
    colsA,
    rowsB,
    colsB
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">

      <Header
        onLoadPreset={loadPreset}
        onCopyLaTeX={copyAsLaTeX}
        copiedTex={copiedTex}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {activeTab === 'vectors' ? (

          <VectorCalculator />

        ) : (

          <>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              <div className="lg:col-span-6">
                <MatrixInput
                  title="Matrix A"
                  color="indigo"
                  rows={rowsA}
                  cols={colsA}
                  matrix={matrixA}
                  onResize={handleResizeA}
                  onCellChange={handleCellChangeA}
                  vectorB={vectorB}
                  onVectorBChange={handleVecBChange}
                  showVectorB={activeTab === 'gauss'}
                  onLoadPreset={loadPreset}
                />
              </div>

              <div className="lg:col-span-6">
                {activeTab === 'ops' ? (
                  <MatrixInput
                    title="Matrix B / Operations"
                    color="purple"
                    rows={rowsB}
                    cols={colsB}
                    matrix={matrixB}
                    onResize={handleResizeB}
                    onCellChange={handleCellChangeB}
                    selectedOp={selectedOp}
                    onSelectOp={setSelectedOp}
                    showOpSelect={true}
                  />
                ) : (
                  <InfoCard
                    activeTab={activeTab}
                    selectedOp={selectedOp}
                  />
                )}
              </div>

            </div>

            <ResultsPanel
              activeTab={activeTab}
              colsA={colsA}
              rowsA={rowsA}
              gaussData={gaussData}
              detData={detData}
              opData={opData}
            />
          </>

        )}

      </main>

      <Footer />

    </div>
  );
}
