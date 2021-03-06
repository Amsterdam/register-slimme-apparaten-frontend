/**
 * Defines a general ActionType to be used with the reducers
 */
export interface ActionType<T> {
  type: string;
  payload: T;
}
