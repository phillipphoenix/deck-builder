import { CardData } from "./CardData";
import Saveable from "./saveable";

export class DeckData extends Saveable<DeckData> {
  static type = "DeckData";

  constructor(partial: Partial<DeckData>) {
    super(DeckData);
    this.id = partial.id;
    this.name = partial.name;
    this.description = partial.description;
    this.cards = partial.cards ?? [];
  }

  id: string;
  name: string;
  description: string;
  cards: CardData[];
}
