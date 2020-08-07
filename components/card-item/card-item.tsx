import React from "react";
import styles from "./card-item.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { CardData } from "../../types/card-data";

export interface cardItemProps {
  cardData: CardData;
}

const CardItem: React.SFC<cardItemProps> = ({ cardData }) => {
  return (
    <div className={styles["card-item"]}>
      <span className={styles["card-item__name"]}>{cardData.name}</span>
      {cardData.description && (
        <span className={styles["card-item__description-icon"]}>
          <FontAwesomeIcon icon={faPen} />
        </span>
      )}
    </div>
  );
};

export default CardItem;
