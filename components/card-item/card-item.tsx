import React from "react";
import styles from "./card-item.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import CardsIcon from "../../resources/playing-cards.svg";
import DescriptionIcon from "../../resources/note-edit.svg";
import { CardData } from "../../types/CardData";

export interface cardItemProps {
  cardData: CardData;
  /**
   * Used to display the amount of this card, for instance in a deck.
   */
  amount?: number;
}

const CardItem: React.SFC<cardItemProps> = ({ cardData, amount }) => {
  return (
    <div className={styles["card-item"]}>
      <span className={styles["card-item__name"]}>{cardData.name}</span>
      {amount && (
        <span className={styles["card-item__amount"]}>
          {amount}
          <CardsIcon />
        </span>
      )}
      {cardData.description && (
        <span className={styles["card-item__description-icon"]}>
          <DescriptionIcon />
        </span>
      )}
    </div>
  );
};

export default CardItem;
