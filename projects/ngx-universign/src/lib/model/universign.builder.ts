import {RedirectionMode, UNIVERSIGN_DEFAULT_IFRAME_ID, UniversignEvent} from './universign.typings';
import {Universign} from './universign.model';
import {EventEmitter} from '@angular/core';

/**
 * Universign class builder
 */
export class UniversignBuilder {
  private $el: string; // HTML identifier in which the iframe will be added
  private $redirectionMode: RedirectionMode;
  private $signerId: string; // Signer identifier (mandatory)
  private $scriptUrl: string; // Iframe javascript url

  // Universign events
  private $onEnd: EventEmitter<UniversignEvent>;
  private $onStart: EventEmitter<UniversignEvent>;
  private $onChange: EventEmitter<UniversignEvent>;

  static getInstance(): UniversignBuilder {
    return new UniversignBuilder();
  }

  get el(): string {
    return this.$el;
  }

  get redirectionMode(): RedirectionMode {
    return this.$redirectionMode;
  }

  get signerId(): string {
    return this.$signerId;
  }

  get scriptUrl(): string {
    return this.$scriptUrl;
  }

  get end(): EventEmitter<UniversignEvent> {
    return this.$onEnd;
  }

  get start(): EventEmitter<UniversignEvent> {
    return this.$onStart;
  }

  get change(): EventEmitter<UniversignEvent> {
    return this.$onChange;
  }

  setEl(el: string) {
    this.$el = el || UNIVERSIGN_DEFAULT_IFRAME_ID;
    return this;
  }

  setRedirectionMode(mode: RedirectionMode) {
    this.$redirectionMode = mode || RedirectionMode.IN;
    return this;
  }

  setSignerId(signerId: string) {
    this.$signerId = signerId;
    return this;
  }

  setScriptUrl(scriptUrl: string) {
    this.$scriptUrl = scriptUrl;
    return this;
  }

  onEnd(subject: EventEmitter<UniversignEvent>) {
    this.$onEnd = subject;
    return this;
  }

  onStart(subject: EventEmitter<UniversignEvent>) {
    this.$onStart = subject;
    return this;
  }

  onChange(subject: EventEmitter<UniversignEvent>) {
    this.$onChange = subject;
    return this;
  }

  build(): Universign {
    return new Universign(this);
  }
}
