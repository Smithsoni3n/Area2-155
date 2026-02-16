const TOTAL_FENCE = 1800;

type MaxAreaResult = {
  W: number;
  L: number;
  A: number;
};

/**
 * Problem 4A:
 * Constraint from the diagram:
 * 2L + 5W = 1800
 */
function fenceConstraint(L: number, W: number): number {
  return 2 * L + 5 * W;
}

/**
 * Solve the constraint for L:
 * L = (1800 - 5W) / 2
 */
function lengthFromWidth(W: number): number {
  return (TOTAL_FENCE - 5 * W) / 2;
}

/**
 * Problem 4B:
 * Area in terms of width W:
 * A(W) = L*W = ((1800 - 5W)/2)W = 900W - 2.5W^2
 */
function areaFromWidth(W: number): number {
  return lengthFromWidth(W) * W;
}

/**
 * Problem 4C:
 * A(W) = -2.5W^2 + 900W is a downward-opening quadratic.
 * Maximum occurs at vertex W = -b/(2a).
 */
function maxAreaSolution(): MaxAreaResult {
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
    <main style={{ fontFamily: 'Arial, sans-serif', maxWidth: 900, margin: '0 auto', padding: 24, lineHeight: 1.7 }}>
      <h1>Blitz Stax - Problem 4 (A through C)</h1>

      <section>
        <h2>4(a) Fence Constraint Equation</h2>
        <p>
          Using the existing fence on one side and the interior dividers shown, the fencing equation is:
        </p>
        <p><code>2L + 5W = 1800</code></p>
      </section>

      <section>
        <h2>4(b) Area as a Function of Width</h2>
        <p>
          From the constraint, <code>L = (1800 - 5W) / 2</code>.
        </p>
        <p>
          So,
          {' '}
          <code>A(W) = L·W = ((1800 - 5W)/2)W = 900W - 2.5W^2</code>.
        </p>
      </section>

      <section>
        <h2>4(c) Largest Possible Area</h2>
        <p>
          For <code>A(W) = -2.5W^2 + 900W</code>, the maximum is at the vertex.
        </p>
        <ul>
          <li><code>W = {W} ft</code></li>
          <li><code>L = {L} ft</code></li>
          <li><code>Maximum Area = {A.toLocaleString()} ft^2</code></li>
          <li><code>Fence Check: 2L + 5W = {fenceCheck} ft</code></li>
        </ul>
      </section>
    </main>
  );
}
