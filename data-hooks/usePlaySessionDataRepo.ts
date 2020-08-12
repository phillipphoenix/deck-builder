import IRepository from "../ORM/IRepository";
import { PlaySessionData, PlaySessionDataRepo } from "../types/PlaySessionData";

export const usePlaySessionDataRepo = (): IRepository<PlaySessionData> => {
  return PlaySessionDataRepo;
};
