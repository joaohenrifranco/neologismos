function getRandomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getRandomArrayItem<T>(array: Array<T>): T {
  return array[getRandomInteger(0, array.length - 1)];
}

export type ChoiceProbabilityBoolean = {
  value: boolean,
  probability: number,
}

export type ChoiceProbabilityNumber = {
  value: number,
  probability: number,
}

export type ChoiceProbability = ChoiceProbabilityNumber | ChoiceProbabilityBoolean;

export function choose(choices: Array<ChoiceProbability>): boolean | number {
  const rand = Math.random();

  let chosen: ChoiceProbability;

  const totalProbability = choices.reduce((accumulated, choice) => {
    const { probability } = choice;
    accumulated += probability

    if (accumulated > rand && !chosen) {
      chosen = choice;
    }

    return accumulated;
  }, 0)

  if (!chosen) {
    chosen = choices[choices.length - 1]
  }

  if (totalProbability != 1) {
    throw new Error('Total probability different than 1');
  }

  return chosen.value;
}