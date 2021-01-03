import Saveable from "../types/saveable";
import IRepository from "./IRepository";
import { GraphQLClient, gql } from "graphql-request";
import { IMyClassBuilder } from "../types/IMyClassBuilder";
import Logger from "../utils/Logger";

// If running tests
console.log("NODE ENV:", process.env.NODE_ENV);
if (process.env.NODE_ENV === "test") {
  const dotenv = require("dotenv");
  // Read environment file.
  dotenv.config({ path: ".env.local" });
}

const endpoint = "https://graphql.fauna.com/graphql";
const client = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${process.env.NEXT_PUBLIC_FAUNA_SECRET}`,
  },
});

export default class FaunaDbRepository<T extends Saveable<T>> implements IRepository<T> {
  protected classRef: IMyClassBuilder<T>;

  private logger: Logger;

  constructor(classRefInit: IMyClassBuilder<T>) {
    this.classRef = classRefInit;
    this.logger = new Logger(`ORM: ${classRefInit.name}`);
  }

  // TODO: Maybe use the method described here: https://medium.com/technest/crud-app-with-next-js-faunadb-and-graphql-388be7141bee
  // It might be easier than making a new repo for each of the data types (which is probably required).

  getAll(): Promise<T[]> {
    // TODO: This will not work generically, as this specifies the table in the DB.
    const query = gql`
      query getProjects {
        allProjects {
          data {
            _id
            name
          }
        }
      }
    `;
    this.logger.log(JSON.stringify(client));
    return client
      .request(query)
      .catch((err) => {
        this.logger.error("An error occurred:", err);
        throw err;
      })
      .then((res) => {
        const data = (<any>Object.values(res)[0]).data;
        // TODO: The data should be properly transformed into the local data.
        return data as T[];
      });
  }
  findById(id: string): Promise<T> {
    throw new Error("Method not implemented.");
  }
  findByIds(ids: string[]): Promise<T[]> {
    throw new Error("Method not implemented.");
  }
  query(predicate: (value: T) => boolean): Promise<T[]> {
    throw new Error("Method not implemented.");
  }
  querySingle(predicate: (value: T) => boolean): Promise<T> {
    throw new Error("Method not implemented.");
  }
  create(input: T): Promise<string> {
    throw new Error("Method not implemented.");
  }
  update(input: T): Promise<string> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
