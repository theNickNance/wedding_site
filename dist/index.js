"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const config = require("config");
const app = express();
const port = config.get('expressPort');
app.use('/', express.static('public'));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
//# sourceMappingURL=index.js.map