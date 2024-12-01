const T3 = [],
  T2 = [],
  T0 = [];

const Origin = [];

new Array(1000).fill(null).forEach((_, index) => {
  const value = index.toString().padStart(3, 0).split("");
  Origin.push(value);

  const single = new Set(value);
  // 三数相同
  if (single.size === 3) T0.push(value);
  // 两数相同
  if (single.size === 2) T2.push(value);
  // 全不相同
  if (single.size === 1) T3.push(value);

  return;
});

// 三数相同
