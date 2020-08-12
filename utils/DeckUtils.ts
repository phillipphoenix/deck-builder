import { DeckData } from "../types/DeckData";

export const TotalCardsInDeck = (deck: DeckData): number => {
  const cardIds = Object.keys(deck.cards);
  const totalCardAmount = cardIds.sum((cId) => deck.cards[cId]);
  return totalCardAmount;
};
