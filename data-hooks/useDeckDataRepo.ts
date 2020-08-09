import IRepository from "../ORM/IRepository";
import { DeckData, DeckDataRepo } from "../types/DeckData";

export const useDeckDataRepo = (): IRepository<DeckData> => {
  return DeckDataRepo;
};
