import Saveable from "../types/saveable";
import IRepository from "./IRepository";
import { IMyClassBuilder } from "../types/IMyClassBuilder";
import Logger from "../utils/Logger";

import { v4 as uuidv4 } from "uuid";

export default class LocalStorageRepository<T extends Saveable<T>> implements IRepository<T> {
  protected classRef: IMyClassBuilder<T>;

  private logger: Logger;

  constructor(classRefInit: IMyClassBuilder<T>) {
    this.classRef = classRefInit;
    this.logger = new Logger(`ORM: ${classRefInit.name}`);
  }

  getAll(): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const dataString = localStorage.getItem(this.classRef.type);
      if (!dataString) {
        resolve([]);
        return;
      }

      try {
        const data = JSON.parse(dataString);
        resolve(data);
      } catch (err) {
        this.logger.error("An error occurred while parsing JSON from local storage.", err);
        reject(err);
      }
    });
  }

  findById(id: string): Promise<T> {
    return this.getAll().then((all) => all.find((val) => val.id === id));
  }

  findByIds(ids: string[]): Promise<T[]> {
    return this.getAll().then((all) => all.filter((val) => ids.indexOf(val.id) >= 0));
  }

  query(predicate: (value: T) => boolean): Promise<T[]> {
    return this.getAll().then((all) => all.filter(predicate));
  }

  querySingle(predicate: (value: T) => boolean): Promise<T> {
    return this.getAll().then((all) => all.find(predicate));
  }

  create(input: T): Promise<string> {
    return this.getAll().then((all) => {
      // If manually giving an ID, check if that ID already exists.
      if (input.id) {
        const existingWithId = all.some((val) => val.id === input.id);
        if (existingWithId) {
          throw Error(
            `A ${this.classRef.name} with the ID ${input.id} already exists. If you want to update, use the update method instead.`
          );
        }
      } else {
        // Else generate an ID for the input.
        input.id = uuidv4();
      }

      // Add input to the list of all values.
      all.push(input);
      // Save the list again.
      const dataString = JSON.stringify(all);
      localStorage.setItem(this.classRef.type, dataString);

      return input.id;
    });
  }

  update(input: T): Promise<string> {
    return this.getAll().then((all) => {
      const existingWithId = all.some((val) => val.id === input.id);
      if (!existingWithId) {
        throw Error(
          `A ${this.classRef.name} with the ID ${input.id} doesn't exist and can therefore not be updated. Please use the create method for creating new values.`
        );
      }

      // Remove old value and add the input.
      const updatedValues = all.filter((val) => val.id !== input.id).push(input);

      // Save the list again.
      const dataString = JSON.stringify(updatedValues);
      localStorage.setItem(this.classRef.type, dataString);

      return input.id;
    });
  }

  delete(id: string): Promise<void> {
    return this.getAll().then((all) => {
      // Filter the value with the given ID away.
      const newValues = all.filter((val) => val.id !== id);
      // Save list again.
      const dataString = JSON.stringify(newValues);
      localStorage.setItem(this.classRef.type, dataString);
    });
  }
}
