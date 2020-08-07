import React, { useEffect, useState } from "react";
import styles from "./edit-card.module.scss";
import useInput from "../../hooks/use-input";

import { useCardData } from "../../data-hooks/cards-hooks";

export interface editCardPage {
  cardId?: string;
  navigateBack: () => void;
}

const EditCard: React.SFC<editCardPage> = ({ cardId, navigateBack }) => {
  const [id, onIdChange, setId] = useInput(cardId);
  const [name, onNameChange, setName] = useInput("");
  const [description, onDescriptionChange, setDescription] = useInput("");

  const [error, setError] = useState("");

  const [fetchCard, saveCard] = useCardData();

  useEffect(() => {
    console.log("AFTER RENDER", cardId);
    if (!cardId) {
      return;
    }
    fetchCard(cardId).then((card) => {
      console.log("CARD FETCHED:", card);
      if (card) {
        setId(card.id);
        setName(card.name);
        setDescription(card.description);
      }
    });
  }, []);

  const navigateToCards = () => {
    navigateBack();
  };

  const saveAction = () => {
    if (!id || !name) {
      setError("Both ID and name is required!");
      return;
    }

    saveCard(
      {
        id,
        name,
        description,
      },
      cardId
    )
      .then(() => {
        navigateToCards();
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className={styles["edit-card"]}>
      <div className={styles.form}>
        <div className={styles["input-group"]}>
          <label>Card ID *</label>
          <input name="id" type="text" value={id} onChange={onIdChange} disabled={!!cardId} />
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
