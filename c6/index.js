const express = require('express');
const conf = require('./pkg/config');
const handlers = require('./handlers/index');
const fileupload = require('express-fileupload');
const jwt = require('express-jwt');
const db = require('./pkg/db');

db.init();

const api = express();

api.use(
    jwt({ 
        secret: conf.get('server').key, 
        algorithms: ['HS256'] 
    }) // HS256 e algoritam koj go koristime i mora tuka da go naznacime
);

api.use(fileupload({
    limit: { lifeSize: 10 * 1024 * 1024 } // maksimum 10mg na file upload file-ot
}));

api.post('/api/v1/files', handlers.saveFile);
api.get('/api/v1/files/:fid', handlers.getFile);

api.use(function (err, req, res, next) {
    if(err.name === 'UnortheriseError') {
        res.status(401).send('invalid tocken ...');
    }
});

api.listen(conf.get('server').port, err => {
    if(err) {
        return console.error(err);
    }
    console.log(`App started on port ${conf.get('server').port}`);
});
