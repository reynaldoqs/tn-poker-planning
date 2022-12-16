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
