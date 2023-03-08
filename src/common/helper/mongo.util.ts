import { ObjectID } from 'mongodb';

/**
 * Parses a string into an object id.
 * @param id string representation of an object id
 */
export function parseToObjectId(id: string): ObjectID | null {
  if (!ObjectID.isValid(id)) return null;
  return ObjectID.createFromHexString(id);
}
