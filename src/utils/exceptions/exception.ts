import { Exceptions } from './exceptionshelper';

export class Exception {
  constructor(readonly exception: Exceptions, readonly message?: string) {}
}