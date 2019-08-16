import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { UniversignConfigService } from './universign.config';
import {
  UNIVERSIGN_DEFAULT_IFRAME_ID,
  UNIVERSIGN_PROD_SCRIPT_URL,
  UNIVERSIGN_TEST_SCRIPT_URL, UniversignConfig,
  UniversignEvent
} from './model/universign.typings';
import { Universign } from './model/universign.model';
import { UniversignBuilder } from './model/universign.builder';

/**
 * Universign iframe component
 *
 * Load the {@see UniversignConfig#scriptUrl} that loads
 * the universign web app via an iframe.
 */
@Component({
  selector: 'ngx-universign-iframe',
  template: '<div id="{{config.id}}" class="iframe-container"></div>',
  styleUrls: ['universign.component.scss']
})
export class UniversignComponent implements OnInit, OnDestroy, OnChanges {
  @Input() config: UniversignConfig ; // component configuration
  @Input() signerId: string; // Signer identifier (mandatory)

  // Bound to universign events
  @Output() progress: EventEmitter<UniversignEvent> = new EventEmitter();
  @Output() begin: EventEmitter<UniversignEvent> = new EventEmitter();
  @Output() end: EventEmitter<UniversignEvent> = new EventEmitter();

  private universign: Universign;

  constructor(private universignConfig: UniversignConfigService) {
    this.config = {id: UNIVERSIGN_DEFAULT_IFRAME_ID};
  }

  ngOnInit() {

    // Build the universign object via its builder
    this.universign = Universign.builder()
      .withEl(this.config.id)
      .withRedirectionMode(this.config.redirectionMode)
      .withScriptUrl(this.universignConfig.prodMode ? UNIVERSIGN_PROD_SCRIPT_URL : UNIVERSIGN_TEST_SCRIPT_URL)
      .withSignerId(this.signerId)
      // Bound universign events to outputs
      .onEnd(this.end)
      .onStart(this.begin)
      .onChange(this.progress)
      .build();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.signerId.currentValue !== changes.signerId.previousValue && this.universign) {
      this.universign.updateSignerId(this.signerId);
      this.universign.start();
    }
  }

  ngOnDestroy() {
    this.universign.end();
  }
}
