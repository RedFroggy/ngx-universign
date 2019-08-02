import { UniversignBuilder } from './universign.builder';
import { RedirectionMode, UNIVERSIGN_TEST_SCRIPT_URL, UniversignEvent } from './universign.typings';
import { EventEmitter } from '@angular/core';
import { Universign } from './universign.model';

describe('Universign builder unit tests', () => {

  let builder: UniversignBuilder;
  const endEvent: EventEmitter<UniversignEvent> = new EventEmitter();
  const startEvent: EventEmitter<UniversignEvent> = new EventEmitter();
  const changeEvent: EventEmitter<UniversignEvent> = new EventEmitter();

  it('should create a universign instance', () => {
    builder = UniversignBuilder.getInstance()
      .setEl('el')
      .setRedirectionMode(RedirectionMode.IN)
      .onEnd(endEvent)
      .onStart(startEvent)
      .onChange(changeEvent)
      .setScriptUrl(UNIVERSIGN_TEST_SCRIPT_URL)
      .setSignerId('1');

    expect(builder).toBeDefined();

    const universign: Universign = builder.build();
    expect(universign).toBeDefined();

    const universignCopy = {...universign} as any;

    expect(universignCopy.el).toBe(builder.el);
    expect(universignCopy.redirectionMode).toBe(builder.redirectionMode);
    expect(universignCopy.signerId).toBe(builder.signerId);
    expect(universignCopy.scriptUrl).toBe(builder.scriptUrl);

    expect(universignCopy.listener).toBeDefined();

    // Default events
    expect(universignCopy.$endEvent).toBeDefined();
    expect(universignCopy.$startEvent).toBeDefined();
    expect(universignCopy.$changeEvent).toBeDefined();
  });
});
