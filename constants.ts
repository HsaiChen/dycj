import { Example, GrammarRule } from './types';

export const EXAMPLES: Example[] = [
  {
    id: '1',
    antecedent: 'The boy',
    relativeWord: 'who',
    mainSentence: 'The boy is my brother.',
    subSentence: 'The boy is reading a book.',
    combined: 'The boy who is reading a book is my brother.',
    translation: '那个正在读书的男孩是我的哥哥。',
    type: 'human'
  },
  {
    id: '2',
    antecedent: 'The car',
    relativeWord: 'which',
    mainSentence: 'I like the car.',
    subSentence: 'The car is red.',
    combined: 'I like the car which is red.',
    translation: '我喜欢那辆红色的车。',
    type: 'thing'
  },
  {
    id: '3',
    antecedent: 'The village',
    relativeWord: 'where',
    mainSentence: 'This is the village.',
    subSentence: 'I was born in the village.',
    combined: 'This is the village where I was born.',
    translation: '这就是我出生的那个村庄。',
    type: 'place'
  }
];

export const RULES: GrammarRule[] = [
  {
    title: "什么是定语从句？",
    content: "定语从句（Attributive Clause）在句中做定语，修饰一个名词或代词。被修饰的名词或代词叫做先行词（Antecedent），引导定语从句的词叫做关系词（Relative Word）。",
    examples: ["The girl [who is singing] is my sister."]
  },
  {
    title: "关系代词 (Relative Pronouns)",
    content: "用于代替先行词在从句中充当主语、宾语或定语。",
    examples: [
      "who: 指人 (主语/宾语)",
      "whom: 指人 (宾语)",
      "which: 指物 (主语/宾语)",
      "that: 指人或物 (主语/宾语)",
      "whose: 指人或物的... (定语)"
    ]
  },
  {
    title: "关系副词 (Relative Adverbs)",
    content: "当先行词表示时间、地点或原因，且在从句中作状语时使用。",
    examples: [
      "when: 时间 (Time)",
      "where: 地点 (Place)",
      "why: 原因 (Reason)"
    ]
  }
];