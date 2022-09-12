export const easeOutQuart = (x) => 1 - Math.pow(1 - x, 4);

export const derivative1st = (x) => 3 * x * x - 2 * x * x * x;

export const derivative2nd = (x) => {
  const x2 = x * x,
    x3 = x2 * x;
  return 6 * x3 * x2 - 15 * x2 * x2 + 10 * x3;
};
