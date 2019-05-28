const sm = require('sitemap');
// const masters = require('./masters');

const sitemap = sm.createSitemap({
    hostname: 'https://yoganext.walborn.now.sh',
    cacheTime: 600000, // cache purge period [ms]
});

const setup = ({ server }) => {
    // for (let i = 0; i < masters.length; i += 1) {
    //     sitemap.add({
    //         url: `/master/${masters[i].id}`,
    //         changefreq: 'daily',
    //         priority: 0.9,
    //     });
    // }

    sitemap.add({
        url: '/',
        changefreq: 'daily',
        priority: 1,
    });

    sitemap.add({
        url: '/schedule',
        changefreq: 'daily',
        priority: 1,
    });

    sitemap.add({
        url: '/price',
        changefreq: 'daily',
        priority: 1,
    });

    sitemap.add({
        url: '/masters', // master/list
        changefreq: 'daily',
        priority: 1,
    });

    sitemap.add({
        url: '/rent',
        changefreq: 'daily',
        priority: 1,
    });

    sitemap.add({
        url: '/contact',
        changefreq: 'daily',
        priority: 1,
    });

    server.get('/sitemap.xml', (req, res) => {
        sitemap.toXML((err, xml) => {
            if (err) {
                res.status(500).end();
                return;
            }

            res.header('Content-Type', 'application/xml');
            res.send(xml);
        });
    });
    server.get('/robots.txt', (req, res) => (
        res.status(200).sendFile('robots.txt', {
            root: __dirname,
            headers: {
                'Content-Type': 'text/plain;charset=UTF-8',
            },
        })
    ));
};

module.exports = setup;
