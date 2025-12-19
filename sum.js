function sumRandom(a, b) {
  const random = Math.random();
  console.log(random);
  return a + b + random + random;
}
module.exports = sumRandom;