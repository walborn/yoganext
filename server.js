const express = require('express');
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

        server.get('*', (req, res) => handle(req, res));

        server.listen(port, err => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`)
        })
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
