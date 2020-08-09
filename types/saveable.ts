import { IMyClassBuilder } from "./IMyClassBuilder";

export default abstract class Saveable<T extends Saveable<T>> {
  readonly type: string;
  id?: string;

  constructor(obj: IMyClassBuilder<T>) {
    this.type = obj.type;
  }
}
