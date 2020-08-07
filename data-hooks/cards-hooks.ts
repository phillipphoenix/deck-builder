import React from "react";
import { CardData } from "../types/card-data";

const cardsStorageId = "cards-catalogue";

const getAllCardsFromLocalStorage = (): Promise<CardData[]> => {
  return new Promise((resolve, reject) => {
    const cardDataString = localStorage.getItem(cardsStorageId);

    if (!cardDataString) {
      resolve([]);
    } else {
      const cardsData = JSON.parse(cardDataString) as CardData[];

      resolve(cardsData);
    }
  });
};

const getCardFromLocalStorage = (cardId: string): Promise<CardData | null> => {
  return getAllCardsFromLocalStorage().then((cards) => {
    return cards.find((card) => card.id === cardId) || null;
  });
};

const saveCardToLocalStorage = (cardData: CardData, prevCardId?: string): Promise<void> => {
  return getAllCardsFromLocalStorage().then((cards) => {
    if (!cardData.id) {
      throw Error("Can't save card data without an ID.");
    }

    // Delete old card data, if card ID was changed.
    if (prevCardId) {
      cards = cards.filter((card) => card.id !== prevCardId);
    } else {
      // If we are creating a new one, make sure that the ID doesn't already exist.
      if (cards.some((card) => card.id === cardData.id)) {
        throw Error(`Can't create a new card with an already existing ID (${cardData.id}).`);
      }
    }

    cards.push(cardData);
    const cardDataString = JSON.stringify(cards);
    localStorage.setItem(cardsStorageId, cardDataString);
  });
};

/*

--- HOW TO USE ---

const [fetchCard, saveCard] = useCardData();

// fetchCard is a function that takes a card ID and returns a promise of a card (or null).
// saveCard takes a CardData object and an optional previous card ID (used when saving where ID was changed).

*/

export const useCardData = (): [
  (cardId: string) => Promise<CardData | null>,
  (cardData: CardData, prevCardId?: string) => Promise<void>
] => {
  const fetchCard = (cardId: string): Promise<CardData | null> => {
    return getCardFromLocalStorage(cardId);
  };

  const saveCard = (cardData: CardData, prevCardId?: string): Promise<void> => {
    return saveCardToLocalStorage(cardData, prevCardId);
  };

  return [fetchCard, saveCard];
};

/*

--- HOW TO USE ---

const fetchAllCards = useAllCardsData();

// fetchAllCards is a function that returns a promise with all the saved cards.

*/

export const useAllCardsData = (): (() => Promise<CardData[]>) => {
  return getAllCardsFromLocalStorage;
};
