interface FluidOptions { minWidth?: number; maxWidth?: number; }

function toRem(px: number): string {
  return `${px / 16}rem`;
}

export function fluid(minSize: number, maxSize: number, options: FluidOptions = {}): string {
  const { minWidth = 480, maxWidth = 2560 } = options;
  const slope = (maxSize - minSize) / (maxWidth - minWidth);
  const yAxisIntersection = -minWidth * slope + minSize;
  return `clamp(${toRem(minSize)}, ${toRem(yAxisIntersection)} + ${slope * 100}vw, ${toRem(maxSize)})`;
}
