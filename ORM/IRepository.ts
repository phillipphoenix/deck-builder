import Saveable from "../types/saveable";

export default interface IRepository<T extends Saveable<T>> {
  getAll(): Promise<T[]>;
  findById(id: string): Promise<T>;
  findByIds(ids: string[]): Promise<T[]>;
  query(predicate: (value: T) => boolean): Promise<T[]>;
  querySingle(predicate: (value: T) => boolean): Promise<T>;
  create(input: T): Promise<string>;
  update(input: T): Promise<string>;
  delete(id: string): Promise<void>;
}
