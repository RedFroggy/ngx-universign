import * as loadjs_ from 'loadjs';
import {UniversignBuilder} from './universign.builder';
import {
  RedirectionMode,
  UNIVERSIGN_EVENT,
  UNIVERSIGN_SCRIPT_PATH,
  UNIVERSIGN_TYPE_BEGIN,
  UNIVERSIGN_TYPE_END,
  UniversignEvent
} from './universign.typings';
import {EventEmitter} from '@angular/core';

const loadjs = loadjs_;

export class Universign {
  private el: string;
  private redirectionMode: RedirectionMode;
  private signerId: string;
  private scriptUrl: string;
  private listener: EventListenerOrEventListenerObject;

  private $changeEvent: EventEmitter<UniversignEvent> = new EventEmitter();
  private $endEvent: EventEmitter<UniversignEvent> = new EventEmitter();
  private $startEvent: EventEmitter<UniversignEvent> = new EventEmitter();

  constructor(builder: UniversignBuilder) {
    this.el = builder.el;
    this.redirectionMode = builder.redirectionMode ;
    this.signerId = builder.signerId;
    this.scriptUrl = builder.scriptUrl;

    if (builder.end) {
      this.$endEvent = builder.end;
    }

    if (builder.start) {
      this.$startEvent = builder.start;
    }

    if (builder.change) {
      this.$changeEvent = builder.change;
    }

    this.listener = this.universignListener.bind(this);
  }

  static builder(): UniversignBuilder {
    return new UniversignBuilder();
  }

  /**
   * Starts the signature process
   */
  start() {

    this.removeListener();

    this.loadScript()
      .then(() => {
        // Listen to universign events
        window.addEventListener(UNIVERSIGN_EVENT, this.listener, false);

        // Initialize the universign iframe with the signer identifier
        window.universignSigInit(this.el, this.signerId, {redirectionMode: this.redirectionMode}, this.scriptUrl);
      });
  }

  /**
   * End the signature process
   */
  end() {
    this.$endEvent.complete();
    this.$startEvent.complete();
    this.$changeEvent.complete();
    this.removeListener();
  }

  updateSignerId(signerId: string) {
    this.signerId = signerId;
  }

  /**
   * Remove universign listener to avoid memory leak
   */
  private removeListener() {
    window.removeEventListener(UNIVERSIGN_EVENT, this.listener, false);
  }

  /**
   * Listen to universign events and triggers a change, start or end event
   * @param event universign event
   */
  private universignListener(event: UniversignEvent) {

    if (event.type === UNIVERSIGN_EVENT) {
      if (event.detail.eventType === UNIVERSIGN_TYPE_END) {
        this.$endEvent.next(event);
      }

      if (event.detail.eventType === UNIVERSIGN_TYPE_BEGIN) {
        this.$startEvent.next(event);
      }

      this.$changeEvent.next(event);

    }
  }

    /**
     * Load the universign javascript script
     * using the loadjs library
     */
  private loadScript(): Promise<string> {
    return loadjs([this.scriptUrl + UNIVERSIGN_SCRIPT_PATH], {returnPromise: true});
  }
}
