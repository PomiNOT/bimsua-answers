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

export interface Sheet {
  id?: string,
  name?: string,
  nQuestion?: number
}

export const DEFAULT_NAME: string = 'My Amazing Answers';