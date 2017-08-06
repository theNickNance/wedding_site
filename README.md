# wedding_site
Wedding site built in TypeScript using MongoDB and Express.  Has a very basic RSVP API that can be accessed at `/api/guests`.

## Getting Started

Build the project

```ssh
$ npm i
$ npm run build
```

## Starting the Server

```ssh
$ npm start
$ open http://localhost:3000
```

The static portion of the website should display in a browser

## Testing the API

There are sample requests that can be found in the `fixtures` directory.  If you are using Visual Studio Code and install the [Rest Client Plugin](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) you can run the requests directly from code.

## Configuring the API

The local server by default uses static json files in the `fixtures` directory.  When deployed to production it will use the MongoDB.  You can change these settings by editing the json files in the `config` directory.

## Project Files

Overall the project is pretty simple

* public - holds all the static html, css, js
* src - is the server in TypeScript
* config - configuration settings
* fixtures - test files

In the `server` source all the db related routes and schemas are defined in the `db` directory.  The server is completely defined in the index.ts
