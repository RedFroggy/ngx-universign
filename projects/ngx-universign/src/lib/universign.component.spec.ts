import { createHostComponentFactory, SpectatorWithHost } from '@netbasal/spectator';
import { UniversignComponent } from './universign.component';
import {
  RedirectionMode,
  UNIVERSIGN_DEFAULT_IFRAME_ID,
  UNIVERSIGN_EVENT, UNIVERSIGN_TEST_BASE_URL,
  UNIVERSIGN_TYPE_BEGIN,
  UniversignEvent
} from './model/universign.typings';
import { EventEmitter } from '@angular/core';

describe('RdfUniversignComponent', () => {

    let host: SpectatorWithHost<UniversignComponent>;
    let component: UniversignComponent;
    let universign;

    const createHost = createHostComponentFactory({
        component: UniversignComponent
    });

    beforeEach(() => {

        host = createHost(`<ngx-universign-iframe></ngx-universign-iframe>`, true);
        component = host.component;
        universign = (component as any).universign;
        expect(universign).toBeDefined();

        (window as any).universignSigInit = () => true;
        spyOn(universign as any, 'loadScript').and.callFake(() => Promise.resolve(true));
        spyOn(universign, 'start').and.callFake(() => false);
        spyOn(universign, 'end').and.callFake(() => false);

        spyOn(window, 'removeEventListener').and.callFake(() => false);
        spyOn(window, 'addEventListener').and.callFake(() => false);
    });

    it('should create', () => {
        host.detectChanges();
        expect(component).toBeDefined();
        expect(component.config).toEqual({id: UNIVERSIGN_DEFAULT_IFRAME_ID});

        expect(universign).toBeDefined();
        expect(universign.signerId).toBeUndefined();
        expect(universign.el).toBe(UNIVERSIGN_DEFAULT_IFRAME_ID);
        expect(universign.redirectionMode).toBe(RedirectionMode.IN);
        expect(universign.scriptUrl).toBe(UNIVERSIGN_TEST_BASE_URL);
    });

    it('any universign events should be propagated to the parent component', () => {
        host.detectChanges();

        let universignEvent: UniversignEvent = null;
        host.output<UniversignEvent>('progress').subscribe(event => universignEvent = event);


        // Test any change event
        const changeEvent: UniversignEvent = {type: UNIVERSIGN_EVENT,
            detail: {eventType: UNIVERSIGN_TYPE_BEGIN, signerId: '1'}} as UniversignEvent;

        (universign.$changeEvent as EventEmitter<UniversignEvent>).next(changeEvent);
        host.detectChanges();

        expect(universignEvent).toEqual(changeEvent);
    });

    it('If the signerId is set at startup, the component should load the iframe', () => {
        host.detectChanges();

        component.signerId = '1';
        component.ngOnInit();
    });

    it('universign start transaction event should be propagated to the parent component', () => {
        host.detectChanges();

        let universignEvent: UniversignEvent = null;
        host.output<UniversignEvent>('begin').subscribe(event => universignEvent = event);


        // Test any change event
        const beginEvent: UniversignEvent = {type: UNIVERSIGN_EVENT,
            detail: {eventType: UNIVERSIGN_TYPE_BEGIN, signerId: '1'}} as UniversignEvent;

        (universign.$startEvent as EventEmitter<UniversignEvent>).next(beginEvent);
        host.detectChanges();

        expect(universignEvent).toEqual(beginEvent);
    });

    it('universign end transaction event should be propagated to the parent component', () => {
        host.detectChanges();

        let universignEvent: UniversignEvent = null;
        host.output<UniversignEvent>('end').subscribe(event => universignEvent = event);


        // Test any change event
        const beginEvent: UniversignEvent = {type: UNIVERSIGN_EVENT,
            detail: {eventType: UNIVERSIGN_TYPE_BEGIN, signerId: '1'}} as UniversignEvent;

        (universign.$endEvent as EventEmitter<UniversignEvent>).next(beginEvent);
        host.detectChanges();

        expect(universignEvent).toEqual(beginEvent);
    });

    it('onChanges method should reload the universign iframe', () => {
        host.detectChanges();

        component.signerId = '2';
        component.ngOnChanges({signerId: {currentValue: '2', previousValue: '1'} as any});

        expect(universign.start).toHaveBeenCalled();
        expect(universign.signerId).toBe('2');

    });

    it('when the component is destroyed, universign events should be removed', () => {
        host.detectChanges();

        component.ngOnDestroy();
        expect(universign.end).toHaveBeenCalled();
    });
});
