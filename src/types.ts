export interface Answer {
  question: number,
  answer: AnswerOption 
}

export enum AnswerOption {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  NONE = ''
}