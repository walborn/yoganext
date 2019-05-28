const express = require('express');
const next = require('next');
const sitemap = require('./sitemap');

const dev = process.env.NODE_ENV !== 'production';

const port = process.env.PORT || 4096;
const url = dev
    ? `http://localhost:${port}`
    : 'https://yoganext.walborn.now.sh';

const index = next({ dev });
const handle = index.getRequestHandler();
index
    .prepare()
    .then(() => {
        const server = express();

        // server.get('/master/list', (req, res) => handle(req, res));
        // server.get('/master/:id', (req, res) => {
        //     const actualPage = '/master/item';
        //     const queryParams = { title: req.params.id };
        //     index.render(req, res, actualPage, queryParams);
        // });

        sitemap({ server });
        server.get('*', (req, res) => handle(req, res));

        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`> Ready on ${url}`);
        });
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });
/*

Old server.js

const express = require('express');
const path = require('path');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = 4096;

app
    .prepare()
    .then(() => {
        const server = express();

        server.get('/master/list', (req, res) => handle(req, res));
        server.get('/master/:id', (req, res) => {
            const actualPage = '/master/item';
            const queryParams = { title: req.params.id };
            app.render(req, res, actualPage, queryParams);
        });
        server.get('/robots.txt', (req, res) => (
            res.status(200).sendFile('robots.txt', {
                root: path.join(__dirname, '/static'),
                headers: {
                    'Content-Type': 'text/plain;charset=UTF-8',
                },
            })
        ));
        server.get('*', (req, res) => handle(req, res));

        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`);
        });
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });
*/
