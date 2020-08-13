import { CardData } from "../types/CardData";

export const shuffleCards = (cards: CardData[]): CardData[] => {
  return cards
    .map((c) => ({ sort: Math.random(), card: c }))
    .sortByAttr((c) => c.sort)
    .map((c) => c.card);
};
