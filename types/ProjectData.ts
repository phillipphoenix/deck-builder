import FaunaDbRepository from "../ORM/FaunaDbRepository";
import LocalStorageRepository from "../ORM/LocalStorageRepository";
import Saveable from "./saveable";

export class ProjectData extends Saveable<ProjectData> {
  static type = "ProjectData";

  constructor(partial: Partial<ProjectData>) {
    super(ProjectData);
    this.id = partial.id;
    this.name = partial.name;
    this.cards = partial.cards;
    this.decks = partial.decks;
    this.playSessions = partial.playSessions;
  }

  id: string;
  name: string;
  cards?: [];
  decks?: [];
  playSessions?: [];
}

export const projectDataRepoLocal = new LocalStorageRepository(ProjectData);
export const projectDataRepo = new FaunaDbRepository(ProjectData);
