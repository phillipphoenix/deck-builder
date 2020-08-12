import Saveable from "./saveable";
import LocalStorageRepository from "../ORM/LocalStorageRepository";
import { CardData } from "./CardData";

export class PlaySessionData extends Saveable<PlaySessionData> {
  static type = "PlaySessionData";

  constructor(partial: Partial<PlaySessionData>) {
    super(PlaySessionData);
    this.id = partial.id;
    this.name = partial.name;
    this.description = partial.description;
    this.cardPile = partial.cardPile || [];
    this.hand = partial.hand || [];
    this.discardPile = partial.discardPile || [];
  }

  id: string;
  name: string;
  description: string;
  deckId: string;
  cardPile: CardData[];
  hand: CardData[];
  discardPile: CardData[];
}

export const PlaySessionDataRepo = new LocalStorageRepository(PlaySessionData);
