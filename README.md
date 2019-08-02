# ngx-universign

[Universign](https://www.universign.com/fr/) iframe integration for Angular. Gives you the possibility to sign documents in the browser.

The universign iframe integration relies on [this documention](https://help.universign.com/hc/fr/articles/360000059698-Int%C3%A9grer-La-page-de-signature-universign-en-mode-Iframe).

The component loads an universign javascript file that creates an iframe in which a user can sign documents.

## Installation

`npm install ngx-universign`

## Getting started

 - Import  `UniversignModule` to your Angular application
 - Add `<ngx-universign-iframe>` in your template
 - The UniversignComponent requires a signerId identifier that can be retrieved once the document to sign is uploaded to universign.
 
## Environments:
There is two universign environments (sign.test.universign.eu and app.universign.com) and a different javascript file for each one:
- https://sign.test.universign.eu/sig/embed.js (loaded by default)
- https://app.universign.com/sig/embed.js (production)
- To use the production mode, you can do: `UniversignModule.forRoot({prodMode: true})`
   
