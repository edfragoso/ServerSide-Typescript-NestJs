import { Exceptions } from './exceptionshelper';

export interface Exception {
  message?: string;
  exception: Exceptions;
}