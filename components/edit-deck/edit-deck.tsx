import React, { useEffect, useState, useMemo, ChangeEvent } from "react";
import styles from "./edit-deck.module.scss";
import useInput from "../../hooks/use-input";

import { useCardDataRepo } from "../../data-hooks/useCardDataRepo";
import { CardData } from "../../types/CardData";
import { useDeckDataRepo } from "../../data-hooks/useDeckDataRepo";
import { DeckData } from "../../types/DeckData";
import Item from "../item/item";

export interface editDeckPageProps {
  deckId?: string;
  navigateBack: () => void;
}

const EditDeck: React.SFC<editDeckPageProps> = ({ deckId, navigateBack }) => {
  const [name, onNameChange, setName] = useInput("");
  const [description, onDescriptionChange, setDescription] = useInput("");
  const [deckCards, setDeckCards] = useState<{ [cardId: string]: number }>({});
  const [allCards, setAllCards] = useState<CardData[]>([]);
  const [cardAmounts, setCardAmounts] = useState<{ [cardId: string]: number }>({});

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
    setCardAmounts(deckCards);
    console.log("CARDS IN DECK:", deckCards);
  }, [allCards, deckCards]);

  const navigateToCards = () => {
    navigateBack();
  };

  const updateCardAmount = (cardId: string, amount: number) => {
    // Toggles the selection of a card.
    setCardAmounts((prevCardAmounts) => {
      if (amount > 0) {
        return {
          ...prevCardAmounts,
          [cardId]: amount,
        };
      }
      // If the amount is 0 or below, delete the card from the deck.
      delete prevCardAmounts[cardId];
      return prevCardAmounts;
    });
  };

  const onCardAmountChange = (cardId: string, evt: ChangeEvent<HTMLInputElement>) => {
    const amount = evt.target.valueAsNumber;
    if (!Number.isInteger(amount) || amount < 0) {
      evt.target.value = "0";
      updateCardAmount(cardId, 0);
    } else {
      updateCardAmount(cardId, amount);
    }
  };

  const saveAction = () => {
    if (!name) {
      setError("Name is required!");
      return;
    }

    console.log("SAVING DECK - CARDS:", cardAmounts);

    // If we don't have a prior card ID, we are creating a new card.
    // Else we are updating an existing card.
    if (!deckId) {
      deckDataRepo
        .create(
          new DeckData({
            name,
            description,
            cards: cardAmounts,
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
            cards: cardAmounts,
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
            <div key={card.id} className={styles["item-with-input"]}>
              <Item itemData={card} />
              <input
                className={`${styles["item-with-input--input-right"]} ${styles["item-with-input--input-small"]}`}
                type="number"
                defaultValue={cardAmounts[card.id]}
                onBlur={(e) => onCardAmountChange(card.id, e)}
              />
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
