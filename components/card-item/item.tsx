import React from "react";
import styles from "./item.module.scss";

import CardsIcon from "../../resources/playing-cards.svg";
import DescriptionIcon from "../../resources/note-edit.svg";

type ItemData = Pick<{ name: string; description: string }, "name" | "description">;

export interface itemProps {
  itemData: ItemData;
  /**
   * Used to display an amount (for instance the amount of cards in a deck).
   */
  amount?: number;
}

const Item: React.SFC<itemProps> = ({ itemData, amount }) => {
  return (
    <div className={styles["card-item"]}>
      <span className={styles["card-item__name"]}>{itemData.name}</span>
      {amount && (
        <span className={styles["card-item__amount"]}>
          {amount}
          <CardsIcon />
        </span>
      )}
      {itemData.description && (
        <span className={styles["card-item__description-icon"]}>
          <DescriptionIcon />
        </span>
      )}
    </div>
  );
};

export default Item;
