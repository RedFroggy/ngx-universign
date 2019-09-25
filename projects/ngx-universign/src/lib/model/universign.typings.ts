export const UNIVERSIGN_EVENT = 'pdsEvent';
export const UNIVERSIGN_TYPE_END = 'end';
export const UNIVERSIGN_TYPE_BEGIN = 'begin';
export const UNIVERSIGN_TEST_BASE_URL = 'https://sign.test.universign.eu';
export const UNIVERSIGN_PROD_BASE_URL = 'https://app.universign.com';
export const UNIVERSIGN_SCRIPT_PATH = '/sig/embed.js';
export const UNIVERSIGN_DEFAULT_IFRAME_ID = 'iframeContainer';

export enum RedirectionMode {
  IN = 'IN',
  OUT = 'OUT'
}

/**
 * Signature event
 */
export interface UniversignEvent extends Event {
  type: string;
  detail: {
    eventType: string;
    signerId: string;
  };
}

export interface UniversignConfig {
  id?: string; // component unique identifier
  redirectionMode?: RedirectionMode; // redirection mode used by universign
}

/**
 * Declare the universignSigInit
 * method available on the window object
 */
declare global {
  interface Window {
    universignSigInit(el: string, signerId: string, configuration: { redirectionMode: string }, targetUrl?: string);
  }
}


