import React from "react";
import styles from "./card.module.scss";

import Deer from "../../resources/deer.svg";

import { CardData } from "../../types/CardData";

export interface itemProps {
  cardData?: CardData;
}

const Card: React.SFC<itemProps> = ({ cardData }) => {
  const cardImage = (
    <>
      {cardData?.imgUrl && (
        <div
          className={styles["card__image"]}
          style={{ backgroundImage: `url(${cardData.imgUrl})` }}
        ></div>
      )}
      {!cardData?.imgUrl && <div className={styles["card__image"]}></div>}
    </>
  );
  return (
    <div className={styles.card}>
      {cardData && (
        <>
          <div className={styles["card__header"]}>{cardData.name}</div>
          {cardImage}
          <div className={styles["card__description"]}>{cardData.description}</div>
        </>
      )}
      {!cardData && (
        <div className={`${styles["card__back"]} ${styles["card__back--red"]}`}>
          <Deer />
        </div>
      )}
    </div>
  );
};

export default Card;
