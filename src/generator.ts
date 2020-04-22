import { VOWELS, CONSONANTS, START_CONSONANTS, MIDDLE_CONSONANTS } from './letters';
import { getRandomArrayItem, choose, ChoiceProbabilityNumber, ChoiceProbabilityBoolean } from './utils';

const STARTING_VOWEL_PROBABILITY: Array<ChoiceProbabilityBoolean> = [
  {
    value: false,
    probability: 0.7,
  },
  {
    value: true,
    probability: 0.3,
  }
]

const DOUBLE_VOWEL_PROBABILITY: Array<ChoiceProbabilityBoolean> = [
  {
    value: false,
    probability: 0.9,
  },
  {
    value: true,
    probability: 0.1,
  }
]

const SYLLABLE_COUNT_PROBABILITY: Array<ChoiceProbabilityNumber> = [
  {
    value: 2,
    probability: 0.1,
  },
  {
    value: 3,
    probability: 0.7,
  },
  {
    value: 4,
    probability: 0.2,
  },
]

function getWordSize(): number {
  return <number>choose(SYLLABLE_COUNT_PROBABILITY);
}

function getRandomVowel(enableDouble: boolean): string {
  const firstVowel = getRandomArrayItem(VOWELS);
  const shouldAddSecondVowel = choose(DOUBLE_VOWEL_PROBABILITY);

  if (!enableDouble || !shouldAddSecondVowel) {
    return firstVowel;
  }

  const forbiddenVowels: Array<string> = [];

  switch (firstVowel) {
    case 'a':
      forbiddenVowels.push('e');
    case 'e':
      forbiddenVowels.push('o')
  }
  forbiddenVowels.push(firstVowel);

  const filteredVowels = VOWELS.filter((vowel) => !forbiddenVowels.includes(vowel));

  const secondVowel = getRandomArrayItem(filteredVowels);

  return `${firstVowel}${secondVowel}`

}

function getRandomConsonant(isWordStart: boolean): string {
  const consonants = isWordStart ?
    CONSONANTS.concat(START_CONSONANTS) : CONSONANTS.concat(MIDDLE_CONSONANTS);

  return getRandomArrayItem(consonants);
}

function generateWord(): string {
  let word = '';
  const syllableCount = getWordSize();

  for (let syllableIndex = 0; syllableIndex < syllableCount; syllableIndex++) {

    const shouldHaveConsonant = choose(STARTING_VOWEL_PROBABILITY) || !!syllableIndex;

    const consonant = shouldHaveConsonant ? getRandomConsonant(!syllableIndex) : '';
    const vowel = getRandomVowel(!!syllableIndex);

    const syllable = `${consonant}${vowel}`;

    word = `${word}${syllable}`
  }

  return word;
}

console.log(generateWord());