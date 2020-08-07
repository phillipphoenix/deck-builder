export class CardData {
  id: string;
  name: string;
  description: string;

  constructor(partial: Partial<CardData>) {
    this.id = partial.id;
    this.name = partial.name;
    this.description = partial.name;
  }
}
