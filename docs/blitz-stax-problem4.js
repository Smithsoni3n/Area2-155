/**
 * Blitz Stax - Problem 4 (A-C)
 *
 * Geometry model from the worksheet image:
 * - Rectangle has length L and width W.
 * - Bottom side lies on an existing fence (no new fence needed there).
 * - Interior fencing creates 8 pens in a 4x2 arrangement:
 *   - 3 interior vertical fences (each width W)
 *   - 1 interior horizontal fence (length L)
 *
 * Fencing used:
 *   top outer side: L
 *   middle divider:  L
 *   left+right sides: 2W
 *   3 vertical dividers: 3W
 *   total: 2L + 5W = 1800
 */

const TOTAL_FENCE = 1800;

/**
 * (a) Constraint equation: 2L + 5W = 1800
 */
function fenceConstraint(L, W) {
  return 2 * L + 5 * W;
}

/**
 * Solve for L in terms of W from 2L + 5W = 1800.
 */
function lengthFromWidth(W) {
  return (TOTAL_FENCE - 5 * W) / 2;
}

/**
 * (b) Area as a function of width:
 * A(W) = L(W) * W = ((1800 - 5W)/2) * W = 900W - 2.5W^2
 */
function areaFromWidth(W) {
  return lengthFromWidth(W) * W;
}

/**
 * (c) Largest possible area (vertex of quadratic).
 * A(W) = -2.5W^2 + 900W
 * W* = -b/(2a) = -900 / (2 * -2.5) = 180
 */
function maxAreaSolution() {
  const a = -2.5;
  const b = 900;

  const W = -b / (2 * a);
  const L = lengthFromWidth(W);
  const A = areaFromWidth(W);

  return { W, L, A };
}

function main() {
  console.log('Blitz Stax - Problem 4 Solutions (A-C)');
  console.log('----------------------------------------');

  // (a)
  console.log('(a) Constraint equation: 2L + 5W = 1800');

  // (b)
  console.log('(b) Area function in terms of W: A(W) = 900W - 2.5W^2');

  // (c)
  const { W, L, A } = maxAreaSolution();
  console.log('(c) Maximum area occurs at:');
  console.log(`    W = ${W} ft`);
  console.log(`    L = ${L} ft`);
  console.log(`    Max Area = ${A} square ft`);

  // quick validation
  const fenceUsed = fenceConstraint(L, W);
  console.log(`    Check fence usage: 2L + 5W = ${fenceUsed} ft`);
}

if (require.main === module) {
  main();
}

module.exports = {
  TOTAL_FENCE,
  fenceConstraint,
  lengthFromWidth,
  areaFromWidth,
  maxAreaSolution
};
