import { CardData, CardDataRepo } from "../types/CardData";
import IRepository from "../ORM/IRepository";

export const useCardDataRepo = (): IRepository<CardData> => {
  return CardDataRepo;
};
