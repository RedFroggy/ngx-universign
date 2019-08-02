import { Universign } from './universign.model';
import { UniversignBuilder } from './universign.builder';
import {
  RedirectionMode,
  UNIVERSIGN_EVENT, UNIVERSIGN_TEST_SCRIPT_URL, UNIVERSIGN_TYPE_BEGIN,
  UNIVERSIGN_TYPE_END,
  UniversignEvent
} from './universign.typings';
import { EventEmitter } from '@angular/core';

describe('Universign model unit tests', () => {

  let universign: Universign;
  let builder: UniversignBuilder;

  const endEvent: EventEmitter<UniversignEvent> = new EventEmitter();
  const startEvent: EventEmitter<UniversignEvent> = new EventEmitter();
  const changeEvent: EventEmitter<UniversignEvent> = new EventEmitter();

  beforeEach(() => {

    builder = UniversignBuilder.getInstance()
      .setEl('el')
      .setRedirectionMode(RedirectionMode.IN)
      .setScriptUrl(UNIVERSIGN_TEST_SCRIPT_URL)
      .setSignerId('1');

    universign = new Universign(builder) as any;

    (window as any).universignSigInit = () => true;
    spyOn(universign as any, 'loadScript').and.callFake(() => Promise.resolve(true));

    spyOn(window, 'removeEventListener').and.callFake(() => false);
    spyOn(window, 'addEventListener').and.callFake(() => false);
    spyOn(window, 'universignSigInit').and.callFake(() => false);

    spyOn((universign as any).$endEvent, 'complete').and.callThrough();
    spyOn((universign as any).$startEvent, 'complete').and.callThrough();
    spyOn((universign as any).$changeEvent, 'complete').and.callThrough();

    spyOn((universign as any).$endEvent, 'next').and.callThrough();
    spyOn((universign as any).$startEvent, 'next').and.callThrough();
    spyOn((universign as any).$changeEvent, 'next').and.callThrough();
  });



  it('model should be successfully build from builder', () => {

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

    builder
      .onEnd(endEvent)
      .onStart(startEvent)
      .onChange(changeEvent);

    universign = new Universign(builder) as any;
  });

  it('start method should call the universign script and load the iframe', (done) => {

    const universignCopy = {...universign} as any;

    universign.start();

    universignCopy.loadScript().then(() => {

      expect(window.addEventListener).toHaveBeenCalledWith(UNIVERSIGN_EVENT, universignCopy.listener, false);

      expect(window.universignSigInit).toHaveBeenCalledWith(universignCopy.el,
        universignCopy.signerId, {redirectionMode: universignCopy.redirectionMode});
      done();
    });

    expect(window.removeEventListener).toHaveBeenCalledWith(UNIVERSIGN_EVENT, universignCopy.listener, false);
  });

  it('end method should remove all event listeners', () => {

    universign.end();

    expect(window.removeEventListener).toHaveBeenCalledWith(UNIVERSIGN_EVENT, (universign as any).listener, false);
    expect((universign as any).$endEvent.complete).toHaveBeenCalled();
    expect((universign as any).$startEvent.complete).toHaveBeenCalled();
    expect((universign as any).$changeEvent.complete).toHaveBeenCalled();
  });

  it('universign events should triggered event emitter notifications', () => {

    (universign as any).universignListener({});
    expect((universign as any).$changeEvent.next).not.toHaveBeenCalled();

    (universign as any).universignListener({type: UNIVERSIGN_EVENT, detail: {eventType: UNIVERSIGN_TYPE_END}});
    expect((universign as any).$endEvent.next).toHaveBeenCalled();

    (universign as any).universignListener({type: UNIVERSIGN_EVENT, detail: {eventType: UNIVERSIGN_TYPE_BEGIN}});
    expect((universign as any).$startEvent.next).toHaveBeenCalled();

    (universign as any).universignListener({type: UNIVERSIGN_EVENT, detail: {}});
    expect((universign as any).$changeEvent.next).toHaveBeenCalled();

  });

});
