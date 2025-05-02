export function trend(values, { strong = 5, weak = 1 } = {}) {
    // pente régression linéaire 
    const n = values.length;
    const sumX = (n - 1) * n / 2;
    const sumX2 = (n - 1) * n * (2 * n - 1) / 6;
    const sumY = values.reduce((a, v) => a + v, 0);
    const sumXY = values.reduce((a, v, i) => a + i * v, 0);
    const a = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX ** 2);
  
    // pente exprimée en variation totale sur 7 j
    const delta = a * (n - 1);
  
    if (delta >= strong)  return 'en forte hausse';
    if (delta >= weak)    return 'en hausse';
    if (delta <= -strong) return 'en forte baisse';
    if (delta <= -weak)   return 'en baisse';
    return 'stable';
  }
  
  export function evolution(tempTrend, presTrend) {
    // amélioration si temperature en hausse et pression en hausse ou stable
    if (tempTrend.includes('hausse') && !presTrend.includes('baisse'))
      return 'en amélioration';
    // degradation si temperature et pression en baisse
    if (tempTrend.includes('baisse') && presTrend.includes('baisse'))
      return 'en dégradation';
    return 'stable';
  }
  