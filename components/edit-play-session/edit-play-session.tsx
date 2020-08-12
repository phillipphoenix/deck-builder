import React, { useEffect, useState, useMemo, ChangeEvent } from "react";
import styles from "./edit-play-session.module.scss";
import useInput from "../../hooks/use-input";

import Item from "../card-item/item";
import { DeckData } from "../../types/DeckData";
import { useDeckDataRepo } from "../../data-hooks/useDeckDataRepo";
import { usePlaySessionDataRepo } from "../../data-hooks/usePlaySessionDataRepo";
import { PlaySessionData } from "../../types/PlaySessionData";

export interface editPlaySessionPageProps {
  playSessionId?: string;
  navigateBack: () => void;
}

const EditPlaySession: React.SFC<editPlaySessionPageProps> = ({ playSessionId, navigateBack }) => {
  const [name, onNameChange, setName] = useInput("");
  const [description, onDescriptionChange, setDescription] = useInput("");
  const [selectedDeckId, onSelectedDeckIdChange, setSelectedDeckId] = useInput("");
  const [allDecks, setAllDecks] = useState<DeckData[]>([]);

  const [error, setError] = useState("");

  const deckDataRepo = useDeckDataRepo();
  const playSessionDataRepo = usePlaySessionDataRepo();

  useEffect(() => {
    deckDataRepo.getAll().then((fetchedDecks) => {
      setAllDecks(fetchedDecks);
    });
  }, []);

  useEffect(() => {
    if (!playSessionId) {
      return;
    }
    playSessionDataRepo.findById(playSessionId).then((playSession) => {
      if (playSession) {
        setName(playSession.name);
        setDescription(playSession.description);
        setSelectedDeckId(playSession.deckId);
      }
    });
  }, [playSessionId]);

  const navigateToCards = () => {
    navigateBack();
  };

  const saveAction = () => {
    if (!name) {
      setError("Name is required!");
      return;
    }

    // If we don't have a prior card ID, we are creating a new card.
    // Else we are updating an existing card.
    if (!playSessionId) {
      playSessionDataRepo
        .create(
          new PlaySessionData({
            name,
            description,
            deckId: selectedDeckId,
          })
        )
        .then(() => {
          navigateToCards();
        })
        .catch((err) => setError(err.message));
    } else {
      playSessionDataRepo
        .update(
          new PlaySessionData({
            id: playSessionId,
            name,
            description,
            deckId: selectedDeckId,
          })
        )
        .then(() => {
          navigateToCards();
        })
        .catch((err) => setError(err.message));
    }
  };

  return (
    <div className={styles["edit-play-session"]}>
      <div className={styles.form}>
        <div className={styles["input-group"]}>
          <label>Play Session Name *</label>
          <input name="name" type="text" value={name} onChange={onNameChange} />
        </div>
        <div className={styles["input-group"]}>
          <label>Play Session Description</label>
          <textarea name="description" value={description} onChange={onDescriptionChange} />
        </div>
        <div className={styles["input-group"]}>
          <label>Select deck for play session</label>
          <select value={selectedDeckId} onChange={(e) => setSelectedDeckId(e.target.value)}>
            {allDecks.map((deck) => (
              <option key={deck.id} value={deck.id}>
                {deck.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          {!playSessionId && (
            <p className={styles["notice-message"]}>
              NOTE: When you update a play session, the state of the session will be reset.
            </p>
          )}
        </div>
        {error && (
          <div>
            <p className={styles["error-message"]}>{error}</p>
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

export default EditPlaySession;
