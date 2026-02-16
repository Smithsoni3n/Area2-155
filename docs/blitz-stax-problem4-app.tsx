import React from 'react';

const TOTAL_FENCE = 1800;

function fenceConstraint(L: number, W: number): number {
  return 2 * L + 5 * W;
}

function lengthFromWidth(W: number): number {
  return (TOTAL_FENCE - 5 * W) / 2;
}

function areaFromWidth(W: number): number {
  return lengthFromWidth(W) * W;
}

function maxAreaSolution(): { W: number; L: number; A: number } {
  // A(W) = ((1800 - 5W)/2)W = -2.5W^2 + 900W
  const a = -2.5;
  const b = 900;

  const W = -b / (2 * a);
  const L = lengthFromWidth(W);
  const A = areaFromWidth(W);

  return { W, L, A };
}

export default function App() {
  const { W, L, A } = maxAreaSolution();
  const fenceCheck = fenceConstraint(L, W);

  return (
    <main style={{ fontFamily: 'Arial, sans-serif', padding: '24px', lineHeight: 1.6 }}>
      <h1>Problem 4 (A through C) - All in One</h1>

      <h2>4(a)</h2>
      <p>Constraint equation:</p>
      <p><code>2L + 5W = 1800</code></p>

      <h2>4(b)</h2>
      <p>From the constraint:</p>
      <p><code>L = (1800 - 5W) / 2</code></p>
      <p>Area function in terms of W:</p>
      <p><code>A(W) = L * W = ((1800 - 5W)/2)W = 900W - 2.5W^2</code></p>

      <h2>4(c)</h2>
      <p>Maximum area occurs at the vertex of <code>A(W) = -2.5W^2 + 900W</code>.</p>
      <ul>
        <li><code>W = {W} ft</code></li>
        <li><code>L = {L} ft</code></li>
        <li><code>Maximum Area = {A.toLocaleString()} square ft</code></li>
        <li><code>Check: 2L + 5W = {fenceCheck} ft</code></li>
      </ul>
    </main>
  );
}
