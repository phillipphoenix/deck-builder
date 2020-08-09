import Saveable from "./saveable";

export interface IMyClassBuilder<T extends Saveable<T>> {
  new (input: Partial<T>): T;
  type: string;
}
