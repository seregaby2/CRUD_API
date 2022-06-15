import { validate as uuidValidate, version as uuidVersion } from 'uuid';

export const valid = (uuid: string): boolean => uuidValidate(uuid) && uuidVersion(uuid) === 4;
