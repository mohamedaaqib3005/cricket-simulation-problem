function simulateBall(batter) {
  const outcomes = [0, 1, 2, 3, 4, 5, 6, "W"];

  const probability = {
    kirat: [0.05, 0.30, 0.25, 0.10, 0.15, 0.01, 0.09, 0.05],
    nodhi: [0.10, 0.40, 0.20, 0.05, 0.10, 0.01, 0.04, 0.10],
    rumrah: [0.20, 0.30, 0.15, 0.05, 0.05, 0.01, 0.04, 0.20],
    shashi: [0.30, 0.25, 0.05, 0.00, 0.05, 0.01, 0.04, 0.30]
  };

  const probabilities = probability[batter];
  const rand = Math.random();

  let cumulative = 0;
  for (let i = 0; i < probabilities.length; i++) {
    cumulative += probabilities[i];
    if (rand <= cumulative) {
      return outcomes[i];
    }
  }
}

module.exports = { simulateBall };
