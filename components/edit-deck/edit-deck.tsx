import React, { useEffect, useState, useMemo } from "react";
import styles from "./edit-deck.module.scss";
import useInput from "../../hooks/use-input";

import { useCardDataRepo } from "../../data-hooks/useCardDataRepo";
import { CardData } from "../../types/CardData";
import { useDeckDataRepo } from "../../data-hooks/useDeckDataRepo";
import { DeckData } from "../../types/DeckData";
import CardItem from "../card-item/card-item";
import Checkbox from "../form-elements/checkbox/checkbox";
import { access } from "fs";

export interface editDeckPageProps {
  deckId?: string;
  navigateBack: () => void;
}

const EditDeck: React.SFC<editDeckPageProps> = ({ deckId, navigateBack }) => {
  const [name, onNameChange, setName] = useInput("");
  const [description, onDescriptionChange, setDescription] = useInput("");
  const [deckCards, setDeckCards] = useState([]);
  const [allCards, setAllCards] = useState<CardData[]>([]);
  const [cardOptions, setCardOptions] = useState<{ [cardId: string]: boolean }>([]);

  const [error, setError] = useState("");

  const deckDataRepo = useDeckDataRepo();
  const cardDataRepo = useCardDataRepo();

  useEffect(() => {
    cardDataRepo.getAll().then((allCards) => {
      setAllCards(allCards);
      return allCards;
    });
  }, []);

  useEffect(() => {
    if (!deckId) {
      return;
    }
    deckDataRepo.findById(deckId).then((deck) => {
      if (deck) {
        setName(deck.name);
        setDescription(deck.description);
        setDeckCards(deck.cards);
      }
    });
  }, [deckId]);

  useEffect(() => {
    const cardOptions = allCards.reduce(
      (acc, card) => ({ ...acc, [card.id]: deckCards.some((c) => c.id === card.id) }),
      {}
    );
    setCardOptions(cardOptions);
    console.log("CARD OPTIONS:", cardOptions);
  }, [allCards, deckCards]);

  const navigateToCards = () => {
    navigateBack();
  };

  const updateSelectedCard = (cardId: string) => {
    // Toggles the selection of a card.
    setCardOptions((prevSelectedCards) => {
      return {
        ...prevSelectedCards,
        [cardId]: !prevSelectedCards[cardId],
      };
    });
  };

  const selectedCardIds = useMemo<string[]>(() => {
    return Object.keys(cardOptions).reduce(
      (acc, cardOptionId) => (cardOptions[cardOptionId] ? [...acc, cardOptionId] : acc),
      []
    );
  }, [cardOptions]);

  const saveAction = () => {
    if (!name) {
      setError("Name is required!");
      return;
    }

    // Create an array of all the selected cards.
    const cards = selectedCardIds.map((cardId) => allCards.find((c) => c.id === cardId));

    // If we don't have a prior card ID, we are creating a new card.
    // Else we are updating an existing card.
    if (!deckId) {
      deckDataRepo
        .create(
          new DeckData({
            name,
            description,
            cards,
          })
        )
        .then(() => {
          navigateToCards();
        })
        .catch((err) => setError(err.message));
    } else {
      deckDataRepo
        .update(
          new DeckData({
            id: deckId,
            name,
            description,
            cards,
          })
        )
        .then(() => {
          navigateToCards();
        })
        .catch((err) => setError(err.message));
    }
  };

  return (
    <div className={styles["edit-deck"]}>
      <div className={styles.form}>
        <div className={styles["input-group"]}>
          <label>Card Name *</label>
          <input name="name" type="text" value={name} onChange={onNameChange} />
        </div>
        <div className={styles["input-group"]}>
          <label>Card Description</label>
          <textarea name="description" value={description} onChange={onDescriptionChange} />
        </div>
        <div className={styles["input-group"]}>
          <label>Select cards in deck</label>
          {allCards.map((card) => (
            <div key={card.id} className={styles["item-with-checkbox"]}>
              <Checkbox
                name={card.id}
                value={card.id}
                checked={selectedCardIds.some((scId) => scId === card.id)}
                onChangeValue={(cardId) => updateSelectedCard(cardId)}
              />
              <CardItem cardData={card} />
            </div>
          ))}
        </div>
        {error && (
          <div className={styles["error-messages"]}>
            <p>{error}</p>
          </div>
        )}
      </div>
      <div className={styles["action-bar"]}>
        <span className={styles.btn} onClick={navigateToCards}>
          Cancel
        </span>
        <span className={styles.btn} onClick={saveAction}>
          Save
        </span>
      </div>
    </div>
  );
};

export default EditDeck;
