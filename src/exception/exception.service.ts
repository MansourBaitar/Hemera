import { Injectable } from '@nestjs/common';
import { DefinitionFactory, DetailFactory } from 'problem-details';
import exceptions from './exceptions.json';

@Injectable()
export class ExceptionService {
  private readonly factory: DefinitionFactory;
  private readonly details: DetailFactory;

  constructor() {
    this.factory = new DefinitionFactory();
    this.details = new DetailFactory(this.factory);
    this.registerExceptions();
  }

  private registerExceptions() {
    this.factory.load(exceptions);
  }

  /**
   * Creates a problem detail exception from a code.
   * @param code Code that references to an exception
   */
  from(code: string) {
    return this.details.createFromCode(code);
  }
}
