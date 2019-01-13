import {IEmployeeAttributes, IEntityAttributes, IUserAttributes, ResponseChain} from "../src";

declare global {
  namespace Express {
    // tslint:disable-next-line
    export interface Request {
      employee: IEmployeeAttributes;
      entity: IEntityAttributes;
      user: IUserAttributes;
      readonly token: string;
    }

    // tslint:disable-next-line
    export interface Response { // TODO: remove this interface
      achain: ResponseChain;
    }
  }
}
