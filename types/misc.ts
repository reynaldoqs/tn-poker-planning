export type ValuesOf<T extends any[]> = T[number];

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;

export type ArgumentTypes<F extends Function> = F extends (
  ...args: infer A
) => any
  ? A
  : never;

// TODO: Move this error to a models in core objects

type ErrorTypes = 'system' | 'user' | 'unknown';

export class PokerPlanningError extends Error {
  private errorType: ErrorTypes;

  constructor(message: string, type: ErrorTypes = 'unknown') {
    super(message);
    this.errorType = type;
  }

  public getMessage() {
    return `${this.errorType} error: ${this.message}`;
  }

  public getFullMessage() {
    return `type: ${this.errorType}
            message: ${this.message}
            name: ${this.name}
            cause: ${this.cause}
            stack: ${this.stack}`;
  }
}

// export type CurrentPlayerCardSlotPosition = {
//   x: number;
//   y: number;
// };

// if(error instanceof FooError){
//   console.log(error.sayHello());
// }
