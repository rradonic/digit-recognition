// we pass in a random() function to help with testing, because mocking the Math.random global
// breaks source maps: https://github.com/babel/babel/issues/5426

export function shuffle(array: unknown[], random: () => number = Math.random) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }
}
