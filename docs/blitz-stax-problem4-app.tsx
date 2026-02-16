import React from 'react';

const TOTAL_FENCE = 1800;

type MaxAreaResult = {
  W: number;
  L: number;
  A: number;
};

// (a) Constraint equation: 2L + 5W = 1800
function fenceConstraint(L: number, W: number): number {
  return 2 * L + 5 * W;
}

function lengthFromWidth(W: number): number {
  return (TOTAL_FENCE - 5 * W) / 2;
}

// (b) A(W) = L(W)*W = ((1800 - 5W)/2)W = 900W - 2.5W^2
function areaFromWidth(W: number): number {
  return lengthFromWidth(W) * W;
}

// (c) Maximum area occurs at vertex of A(W) = -2.5W^2 + 900W
function maxAreaSolution(): MaxAreaResult {
  const a = -2.5;
  const b = 900;
  const W = -b / (2 * a);
  const L = lengthFromWidth(W);
  const A = areaFromWidth(W);

  return { W, L, A };
}

export default function App(): JSX.Element {
  const { W, L, A } = maxAreaSolution();
  const check = fenceConstraint(L, W);

  return (
    <main style={{ fontFamily: 'system-ui', padding: 20, lineHeight: 1.6 }}>
      <h1>Blitz Stax Problem 4 (A–C)</h1>
      <p><strong>(a)</strong> Constraint: <code>2L + 5W = 1800</code></p>
      <p><strong>(b)</strong> Area function: <code>A(W) = 900W - 2.5W²</code></p>
      <p><strong>(c)</strong> Max occurs at <code>W = {W}</code>, <code>L = {L}</code></p>
      <p>Largest area: <strong>{A.toLocaleString()} ft²</strong></p>
      <p>Fence check: <code>2L + 5W = {check}</code></p>
    </main>
  );
}
