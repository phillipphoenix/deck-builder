import Saveable from "./saveable";
import LocalStorageRepository from "../ORM/LocalStorageRepository";

export class CardData extends Saveable<CardData> {
  static type = "CardData";

  constructor(partial: Partial<CardData>) {
    super(CardData);
    this.id = partial.id;
    this.name = partial.name;
    this.imgUrl = partial.imgUrl;
    this.description = partial.description;
  }

  id: string;
  name: string;
  imgUrl?: string;
  description: string;
}

export const CardDataRepo = new LocalStorageRepository(CardData);
