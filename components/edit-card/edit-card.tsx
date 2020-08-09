import React, { useEffect, useState } from "react";
import styles from "./edit-card.module.scss";
import useInput from "../../hooks/use-input";

import { useCardDataRepo } from "../../data-hooks/useCardDataRepo";
import { CardData } from "../../types/CardData";

export interface editCardPage {
  cardId?: string;
  navigateBack: () => void;
}

const EditCard: React.SFC<editCardPage> = ({ cardId, navigateBack }) => {
  const [id, onIdChange, setId] = useInput(cardId ?? "");
  const [name, onNameChange, setName] = useInput("");
  const [description, onDescriptionChange, setDescription] = useInput("");

  const [error, setError] = useState("");

  const cardDataRepo = useCardDataRepo();

  useEffect(() => {
    if (!cardId) {
      return;
    }
    cardDataRepo.findById(cardId).then((card) => {
      if (card) {
        setId(card.id);
        setName(card.name);
        setDescription(card.description);
      }
    });
  }, [cardId]);

  const navigateToCards = () => {
    navigateBack();
  };

  const saveAction = () => {
    if (!id || !name) {
      setError("Both ID and name is required!");
      return;
    }

    // If we don't have a prior card ID, we are creating a new card.
    // Else we are updating an existing card.
    if (!cardId) {
      cardDataRepo
        .create(
          new CardData({
            id,
            name,
            description,
          })
        )
        .then(() => {
          navigateToCards();
        })
        .catch((err) => setError(err.message));
    } else {
      cardDataRepo
        .update(
          new CardData({
            id,
            name,
            description,
          })
        )
        .then(() => {
          navigateToCards();
        })
        .catch((err) => setError(err.message));
    }
  };

  return (
    <div className={styles["edit-card"]}>
      <div className={styles.form}>
        <div className={styles["input-group"]}>
          <label>Card ID *</label>
          <input name="id" type="text" value={id} onChange={onIdChange} disabled={!!cardId} />
          <p className={styles.small}>
            Card IDs will be used for identification and for sorting of cards.
          </p>
        </div>
        <div className={styles["input-group"]}>
          <label>Card Name *</label>
          <input name="name" type="text" value={name} onChange={onNameChange} />
        </div>
        <div className={styles["input-group"]}>
          <label>Card Description</label>
          <textarea name="description" value={description} onChange={onDescriptionChange} />
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

export default EditCard;
