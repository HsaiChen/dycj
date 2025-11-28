export interface Example {
  id: string;
  antecedent: string; // 先行词
  relativeWord: string; // 关系词
  mainSentence: string;
  subSentence: string;
  combined: string;
  translation: string;
  type: 'human' | 'thing' | 'time' | 'place' | 'reason';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum Step {
  Separate = 0,
  Highlight = 1,
  Transform = 2,
  Combine = 3,
}

export interface GrammarRule {
  title: string;
  content: string;
  examples: string[];
}