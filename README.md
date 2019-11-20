# ngx-universign [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![CircleCI](https://circleci.com/gh/RedFroggy/ngx-universign.svg?style=svg)](https://circleci.com/gh/RedFroggy/ngx-universign) [![Codecov](https://codecov.io/gh/RedFroggy/ngx-universign/branch/master/graph/badge.svg)](https://codecov.io/gh/RedFroggy/ngx-universign)

[Universign](https://www.universign.com/fr/) iframe integration for Angular. Gives you the possibility to sign documents in the browser.

The universign iframe integration relies on [this documention](https://help.universign.com/hc/fr/articles/360000059698-Int%C3%A9grer-La-page-de-signature-universign-en-mode-Iframe).

The component loads an universign javascript file that creates an iframe in which a user can sign documents.

## Installation

`npm install ngx-universign`

## Getting started

 - Import  `UniversignModule` to your Angular application
 
 ```javascript
 import { UniversignModule } from 'ngx-universign';

 @NgModule({
   imports: [
     UniversignModule
   ]
 })
 export class AppModule {}
 ```
 
 - Add `<ngx-universign-iframe [signerId]="signerId">` in your template. It will load the document to sign in the iframe.
 - The `signerId` identifier can be retrieved once the document to sign is uploaded to universign.
 
## Environments:
There is two universign environments (sign.test.universign.eu and app.universign.com) and a different javascript file for each one:
- https://sign.test.universign.eu/sig/embed.js (loaded by default)
- https://app.universign.com/sig/embed.js (production)
- To use the production mode, you can do: `UniversignModule.forRoot({prodMode: true})`
   
