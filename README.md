# ngx-universign 

<div align="center">
  <a name="logo" href="https://www.redfroggy.fr"><img src="images/logo.png" alt="RedFroggy"></a>
  <h4 align="center">A RedFroggy project</h4>
</div>
<br/>

<div align="center">
  <a href="https://forthebadge.com"><img src="https://forthebadge.com/images/badges/fuck-it-ship-it.svg"/></a>
  <a href="https://forthebadge.com"><img src="https://forthebadge.com/images/badges/built-with-love.svg"/></a>
<a href="https://forthebadge.com"><img src="https://forthebadge.com/images/badges/made-with-javascript.svg"/></a>
</div>
<div align="center">
  <a href="https://codecov.io/gh/RedFroggy/ngx-universign"><img src="https://codecov.io/gh/RedFroggy/ngx-universign/branch/master/graph/badge.svg"/></a>
  <a href="https://circleci.com/gh/RedFroggy/ngx-universign"><img src="https://circleci.com/gh/RedFroggy/ngx-universign.svg?style=svg"/></a>
   <a href="https://github.com/semantic-release/semantic-release"><img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg"/></a>
</div>

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
 - The `signerId` identifier si provided by universign once the document is uploaded.
 
## Environments:
There is two universign environments (sign.test.universign.eu and app.universign.com) and a different javascript file for each one:
- https://sign.test.universign.eu/sig/embed.js (loaded by default)
- https://app.universign.com/sig/embed.js (production)
- To use the production mode, you can do: `UniversignModule.forRoot({prodMode: true})`
   
