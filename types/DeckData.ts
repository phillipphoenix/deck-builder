import { CardData } from "./CardData";
import Saveable from "./saveable";
import LocalStorageRepository from "../ORM/LocalStorageRepository";

export class DeckData extends Saveable<DeckData> {
  static type = "DeckData";

  constructor(partial: Partial<DeckData>) {
    super(DeckData);
    this.id = partial.id;
    this.name = partial.name;
    this.description = partial.description;
    this.cards = partial.cards ?? {};
  }

  id: string;
  name: string;
  description: string;
  /**
   * Describes the number of each card (card ID) in the deck. Doesn't contain entries for cards with count 0.
   */
  cards: { [cardId: string]: number };
}

export const DeckDataRepo = new LocalStorageRepository(DeckData);
