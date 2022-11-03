const breakpoints = {
  xs: 320,
  sm: 600,
  md: 768,
  lg: 1024,
  xl: 1280,
};

const mq = (n) => {
  const bpArray = Object.keys(breakpoints).map((key) => [
    key,

    breakpoints[key],
  ]);

  const [result] = bpArray.reduce((acc, [name, size]) => {
    if (n === name) return [...acc, `@media (max-width: ${size}px)`];

    return acc;
  }, []);

  return result;
};

export default mq;
