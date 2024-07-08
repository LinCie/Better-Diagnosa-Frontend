export interface Symptom {
  question: string;
  belief: number;
}

function combineBeliefs(belief1: number, belief2: number): number {
  return belief1 + belief2 - belief1 * belief2;
}

function dempsterShafer(answer: boolean[], symptoms: Symptom[]): number {
  let combinedBelief = 0;

  for (let i = 0; i < symptoms.length; i++) {
    if (answer[i]) {
      combinedBelief = combineBeliefs(combinedBelief, symptoms[i].belief);
    }
  }

  return combinedBelief;
}

export function isDengue(answer: boolean[], symptoms: Symptom[]): boolean {
  const threshold = 0.7;

  return dempsterShafer(answer, symptoms) > threshold;
}
