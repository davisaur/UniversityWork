const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/express_api', async (req, res) => {
    const {status, data} = await getComments(req);
    res.status(status);
    if(data) {
        res.json(data);
    } else {
        res.end();
    }
});

app.post('/express_api', async (req, res) => {
    const {status, data} = await postComment(req);
    res.status(status);
    if(data) {
        res.json(data);
    } else {
        res.end();
    }
});

app.put('/express_api', async (req, res) => {
    res.status(405).end();
});

app.delete('/express_api', async (req, res) => {
    res.status(405).end();
});

async function getComments(req) {

    let status = 500, data = null;

    try {
        const oid = req.query.oid;

        if(oid && oid.length > 0 && oid.length <= 32 && oid.match(/^[a-zA-Z0-9]+$/)) {
            await new Promise((resolve, reject) => {
                const sql = 'SELECT name, comment FROM comments WHERE oid = ?';

                db.all(sql, [oid], (err, rows) => {
                    if(err) {
                        status = 204;
                        reject(err);
                    } else {
                        status = 200;
                        data = {
                            oid: oid,
                            comments: rows
                        };
                    }
                    resolve();
                });
            });
            
        } else {
            status = 400;
        }
    } catch(err) {
        console.error(err);
    }
    return {status, data};
}

async function postComment(req) {

    let status = 500, data = null;

    try {
        const oid = req.body.oid;
        const name = req.body.name;
        const comment = req.body.comment;

        if(oid && oid.length > 0 && oid.length <= 32 
            && oid.match(/^[a-zA-Z0-9]+$/) 
            && name && name.length > 0 && name.length <= 64 
            && comment && comment.length > 0) {
            await new Promise((resolve, reject) => {
                const sql = 'INSERT INTO comments (oid, name, comment) VALUES (?, ?, ?)';

                db.run(sql, [oid, name, comment], (err) => {
                    if(err) {
                        status = 204;
                        reject(err);
                    } else {
                        status = 200;
                        data = { id: this.lastID};
                    }
                    resolve();
                });
            });
        } else {
            status = 400;
        }
    } catch(err) {
        console.error(err);
    }
    return {status, data};
}

app.get('/', (req, res) => {
    res.send({message: 'ok'});
});

app.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
});
