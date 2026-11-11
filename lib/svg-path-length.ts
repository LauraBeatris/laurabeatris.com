/**
 * The length of an SVG path, for drawing it progressively with a dash. Handles
 * the commands the signature uses: M, L, C, Q, A and Z, absolute or relative.
 * Arcs are measured as circular, which the signature's always are.
 */
export function pathLength(d: string) {
  const tokens = d.match(/[a-zA-Z]|-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/g) ?? [];
  let index = 0;
  let command = "";
  let x = 0;
  let y = 0;
  let startX = 0;
  let startY = 0;
  let length = 0;

  const next = () => Number(tokens[index++]);

  while (index < tokens.length) {
    if (/[a-zA-Z]/.test(tokens[index])) command = tokens[index++];
    const relative = command === command.toLowerCase();
    const point = (): [number, number] => {
      const px = next();
      const py = next();
      return relative ? [x + px, y + py] : [px, py];
    };

    switch (command.toUpperCase()) {
      case "M": {
        [x, y] = point();
        [startX, startY] = [x, y];
        // Coordinates after a moveto are implicit linetos
        command = relative ? "l" : "L";
        break;
      }
      case "L": {
        const [nx, ny] = point();
        length += Math.hypot(nx - x, ny - y);
        [x, y] = [nx, ny];
        break;
      }
      case "C": {
        const points = [[x, y], point(), point(), point()];
        length += curveLength(points);
        [x, y] = points[3];
        break;
      }
      case "Q": {
        const points = [[x, y], point(), point()];
        length += curveLength(points);
        [x, y] = points[2];
        break;
      }
      case "A": {
        const radius = next();
        next(); // ry, the same as rx for a circle
        next(); // x-axis rotation
        const largeArc = next() === 1;
        next(); // sweep
        const [nx, ny] = point();
        const chord = Math.hypot(nx - x, ny - y);
        const r = Math.max(radius, chord / 2);
        const angle = 2 * Math.asin(Math.min(1, chord / (2 * r)));
        length += r * (largeArc ? 2 * Math.PI - angle : angle);
        [x, y] = [nx, ny];
        break;
      }
      case "Z": {
        length += Math.hypot(startX - x, startY - y);
        [x, y] = [startX, startY];
        break;
      }
      default:
        throw new Error(`Unsupported path command "${command}"`);
    }
  }

  return length;
}

/** Measures a Bézier curve of any order by walking it in small steps. */
function curveLength(points: number[][], steps = 64) {
  let length = 0;
  let previous = points[0];
  for (let step = 1; step <= steps; step++) {
    const current = bezierPoint(points, step / steps);
    length += Math.hypot(current[0] - previous[0], current[1] - previous[1]);
    previous = current;
  }
  return length;
}

function bezierPoint(points: number[][], t: number): number[] {
  if (points.length === 1) return points[0];
  return bezierPoint(
    points.slice(1).map((point, i) => [
      points[i][0] + (point[0] - points[i][0]) * t,
      points[i][1] + (point[1] - points[i][1]) * t,
    ]),
    t,
  );
}
