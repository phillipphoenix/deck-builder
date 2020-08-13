import React from "react";
import styles from "./card-pile.module.scss";
import { CardData } from "../../types/CardData";
import Card from "../card/card";

export interface cardPileProps {
  cards: CardData[];
  isFaceUp?: boolean;
}

const CardPile: React.SFC<cardPileProps> = ({ cards, isFaceUp }) => {
  return (
    <div className={`${styles.pile} ${styles["pile--" + cards.length]}`}>
      {cards &&
        isFaceUp &&
        cards.map((card, i) => (
          <span key={i} className={`${styles["card-in-pile"]} ${styles["card-in-pile--" + i]}`}>
            <Card cardData={card} />
          </span>
        ))}
      {cards &&
        !isFaceUp &&
        cards.map((card, i) => (
          <span key={i} className={`${styles["card-in-pile"]} ${styles["card-in-pile--" + i]}`}>
            <Card />
          </span>
        ))}
    </div>
  );
};

CardPile.defaultProps = {
  isFaceUp: false,
};

export default CardPile;
