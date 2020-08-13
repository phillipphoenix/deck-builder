import { DeckData } from "../types/DeckData";
import IRepository from "../ORM/IRepository";
import { CardData } from "../types/CardData";

export const TotalCardsInDeck = (deck: DeckData): number => {
  const cardIds = Object.keys(deck.cards);
  const totalCardAmount = cardIds.sum((cId) => deck.cards[cId]);
  return totalCardAmount;
};

export const GetCardsInDeck = (
  deck: DeckData,
  cardDataRepo: IRepository<CardData>
): Promise<CardData[]> => {
  return cardDataRepo.getAll().then((allCards) => {
    return Object.keys(deck.cards).reduce((acc, cardId) => {
      const card = allCards.find((c) => c.id === cardId);
      const amount = deck.cards[cardId];
      for (let i = 0; i < amount; i++) {
        acc.push(card);
      }
      return acc;
    }, []);
  });
};
